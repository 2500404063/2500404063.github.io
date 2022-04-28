#include "threadpool.h"
#include <iostream>
#include <string>
#include <stdio.h>

using namespace std;

void testTask(TaskData *data)
{
    this_thread::sleep_for(chrono::milliseconds(500));
    printf("Task Finished, Data: %d\r\n", data->num);
}

int main(int argc, const char **argv)
{
    TaskQueue tasks;
    TaskData data;
    data.num = 5;

    ThreadPool tp;

    tp.Create(3);
    for (size_t i = 0; i < 6; i++)
    {
        tp.AddTask(testTask, &data, &tasks);
    }
    tp.Start(&tasks);
    char c;
    while (true)
    {
        scanf("%c", &c);
        if (c == 'q')
        {
            tp.Destory();
        }
        tp.AddTask(testTask, &data, &tasks);
        tp.AddTask(testTask, &data, &tasks);
        tp.AddTask(testTask, &data, &tasks);
    }
    return 0;
}