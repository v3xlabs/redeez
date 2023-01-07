import { RedisClientType } from 'redis';

export const gatherTask = async function* <K>(
    redisClient: RedisClientType,
    queue: string
): AsyncGenerator<K> {
    while (redisClient.isOpen) {
        const { element } = (await redisClient.BRPOP(queue, 0)) as unknown as {
            element: string | null;
        } | null;

        if (element === null) continue;

        try {
            // Insert validation logic here
            const parsed = element as K;

            yield parsed;
        } catch (error) {
            console.log(error);
            continue;
        }
    }
};
