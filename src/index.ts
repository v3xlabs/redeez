import { RedisClientType } from 'redis';

import { gatherTask } from './gatherTask';
import { TaskDefinition } from './TaskDefinition';

type TaskCollection<T> = Record<string, TaskDefinition<T>>;

type ExtractFromHandler<TDefinition> = TDefinition extends TaskDefinition<
    infer Typ
>
    ? Typ
    : never;

export const handleTasks = <TColl extends TaskCollection<T>, T>(
    redis: RedisClientType,
    tasks: TColl
) => {
    for (const [task, data] of Object.entries(tasks)) {
        (async () => {
            for await (const printInfo of gatherTask<
                ExtractFromHandler<typeof data>
            >(redis, data.queue)) {
                console.log('task', task, 'data', printInfo);
                await data.handler(printInfo);
            }
        })();
    }
};
