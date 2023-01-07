import { z } from 'zod';

import { handleTasks } from './index';
import { zodValidator } from './validators/zodValidator';

const redis = { isOpen: true } as any;

const scyllo = {};

console.log('booting...`');

console.log('ready to handl etasks');

const a = handleTasks(redis, {
    printItem: {
        queue: 'printer:queue',
        handler: async (task) => { },
        validate: zodValidator(
            z.object({
                a: z.string(),
                b: z.number(),
            })
        ),
    },
    setSettings: {
        queue: 'printer:queue1',
        handler: async (hello) => { },
        validate: zodValidator(z.boolean()),
    },
});
