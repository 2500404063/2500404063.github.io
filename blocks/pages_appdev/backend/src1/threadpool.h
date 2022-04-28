#ifndef THREAD_POOL
#define THEAD_POOL

#include <thread>
#include <queue>
#include <vector>
#include <chrono>
#include <condition_variable>
#include <mutex>

#define IN
#define OUT

typedef struct _TaskData
{
    int num;
} TaskData;

using TaskFunc = void (*)(TaskData *);
// typedef void (*TaskFunc)(TaskData *);

typedef struct _Woker
{
    uint32_t id;
    bool isSpare = true;
    std::thread mthread;
} Woker;

typedef struct _Task
{
    TaskFunc func;
    TaskData *data;
} Task;

typedef struct _Pool
{
    std::vector<Woker *> poolCell;
    uint32_t spareCount;
} Pool;

typedef std::queue<Task *> TaskQueue;

typedef uint8_t PoolHandle;

class ThreadPool
{
private:
    Pool _pool;
    PoolHandle _poolHandle;

    std::thread caller;
    std::mutex lockTasks;
    std::mutex lockThreads;
    std::condition_variable cvTasks;
    std::condition_variable cvThreads;

    void dispatcher(TaskQueue *tasks);
    void taskDelegator(Task *task, size_t pos);

public:
    ThreadPool(){};
    ThreadPool(uint8_t wokerNum);
    ~ThreadPool();
    void Create(IN uint8_t wokerNum);
    void AddTask(IN TaskFunc _func, IN TaskData *_data, OUT TaskQueue *tasks);
    void Start(IN TaskQueue *tasks);
    void Destory();
};

#endif // !THREAD_POOL#define THEAD_POOL