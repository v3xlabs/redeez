import { RedisClientType } from 'redis';

import { gatherTask } from './gatherTask';
import { TaskDefinition, Validator } from './TaskDefinition';

type TaskCollection<T extends Record<string, TaskDefinition<any>>> = T;

type ExtractFromHandler<TDefinition extends TaskDefinition<unknown>> =
    TDefinition['validate'] extends Validator<infer Typ> ? Typ : never;

export const handleTasks = <TColl extends TaskCollection<any>>(
    redis: RedisClientType,
    tasks: TColl
): { [key in keyof TColl]: ExtractFromHandler<TColl[key]> } => {
    for (const task of Object.keys(tasks)) {
        const taskData = tasks[task];

        (async () => {
            for await (const printInfo of gatherTask(redis, taskData.queue)) {
                await tasks.handler(printInfo);
            }
        })();
    }
};
