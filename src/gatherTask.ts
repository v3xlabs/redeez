import { RedisClientType } from 'redis';
import { ZodSchema } from 'zod';

export const gatherTask = async function* <K>(
    redisClient: RedisClientType,
    queue: string,
    validate: ZodSchema
): AsyncGenerator<K> {
    while (redisClient.isOpen) {
        const { element } = (await redisClient.BRPOP(queue, 0)) as unknown as {
            element: string | null;
        } | null;

        if (element === null) continue;

        try {
            // Insert validation logic here
            if (validate && validate._type instanceof Object) {
                console.log('is Object');
                yield await validate.parseAsync(element);
            }

            const parsed = element as K;

            yield parsed;
        } catch (error) {
            console.log(error);
            continue;
        }
    }
};
