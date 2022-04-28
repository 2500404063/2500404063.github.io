#include "threadpool.h"

using namespace std;

void ThreadPool::Create(IN uint8_t wokerNum)
{
    for (size_t i = 0; i < wokerNum; i++)
    {
        Woker *t = new Woker;
        t->id = i;
        this->_pool.poolCell.push_back(t);
    }
    this->_pool.spareCount = wokerNum;
}

void ThreadPool::AddTask(IN TaskFunc _func, IN TaskData *_data, OUT TaskQueue *tasks)
{
    Task *t = new Task;
    t->func = _func;
    t->data = _data;
    tasks->push(t);
    this->cvTasks.notify_one();
}

void ThreadPool::Start(IN TaskQueue *tasks)
{
    this->_poolHandle = 1;
    caller = thread(&ThreadPool::dispatcher, this, tasks);
    caller.detach();
}

void ThreadPool::Destory()
{
    this->_poolHandle = 0;
    this->cvTasks.notify_one();
    this->cvThreads.notify_one();
    for (size_t i = 0; i < this->_pool.poolCell.size(); i++)
    {
        delete this->_pool.poolCell.at(i);
        this->_pool.poolCell.at(i) = 0;
    }
}

void ThreadPool::dispatcher(TaskQueue *tasks)
{
    while (this->_poolHandle)
    {
        unique_lock<mutex> ulockTasks(this->lockTasks);
        this->cvTasks.wait(ulockTasks, [=]() -> bool
                           { return tasks->size() > 0; });
        if (!this->_poolHandle)
            break;
        unique_lock<mutex> ulockThreads(this->lockThreads);
        this->cvThreads.wait(ulockThreads, [&, this]() -> bool
                             { return this->_pool.spareCount > 0; });
        if (!this->_poolHandle)
            break;
        for (size_t i = 0; i < this->_pool.poolCell.size(); i++)
        {
            if (this->_pool.poolCell.at(i)->isSpare)
            {
                this->_pool.spareCount--;
                this->_pool.poolCell.at(i)->isSpare = false;
                this->_pool.poolCell.at(i)->mthread = thread(&ThreadPool::taskDelegator, this, tasks->front(), i);
                this->_pool.poolCell.at(i)->mthread.detach();
                tasks->pop();
                break;
            }
        }
    }
}

void ThreadPool::taskDelegator(Task *task, size_t pos)
{
    task->func(task->data);
    delete task;
    this->_pool.poolCell.at(pos)->isSpare = true;
    this->_pool.spareCount++;
    this->cvThreads.notify_one();
}

ThreadPool::ThreadPool(uint8_t wokerNum)
{
    this->Create(wokerNum);
}

ThreadPool::~ThreadPool()
{
    if (this->_poolHandle)
    {
        this->Destory();
    }
}