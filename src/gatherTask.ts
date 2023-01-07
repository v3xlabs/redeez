import { RedisClientType } from 'redis';

export const gatherTask = async function* <K>(
    redisClient: RedisClientType,
    queue: string
): AsyncGenerator<K> {
    while (redisClient.isOpen) {
        const popped = await redisClient.brPop(queue, 0);

        if (popped === null) continue;

        try {
            // Insert validation logic here
            const parsed = JSON.parse(popped) as K;

            yield parsed;
        } catch (error) {
            console.log(error);
            continue;
        }
    }
};
