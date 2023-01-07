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
            const _redis = redis.duplicate();

            await _redis.connect();

            for await (const printInfo of gatherTask<
                ExtractFromHandler<typeof data>
            >(_redis, data.queue)) {
                try {
                    await data.handler(_redis, printInfo);
                } catch (error) {
                    console.log('queue_abort_error', error);
                }
            }
        })();
    }
};
