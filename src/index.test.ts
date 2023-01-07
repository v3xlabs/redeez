import { createTaskHandler } from './index';

const redis = { isOpen: true } as any;

const handleTask = createTaskHandler(redis, {
    printItem: {
        queue: 'printer:queue',
        zod: {},
    },
    setSettings: {
        queue: 'printer:queue',
        zod: {},
    },
});

for await (const task of handleTask()) {

    if (task.type == 'printItem') {

    }
    accept();
}
