import { RedisClientType } from 'redis';

export type Handler<Task> = (
    redis: RedisClientType,
    task: Task
) => Promise<void>;
