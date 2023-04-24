import { z } from 'zod';

import { handleTasks } from '.';

const OBJ = z.object({
    /**
     * ENS Name
     */
    ens: z.string(),

    /**
     * Keys to resolve
     * @default ['url','email','com.twitter','com.discord','com.github','com.reddit','com.telegram']
     */
    keys: z
        .array(
            z.enum([
                'url',
                'email',
                'com.twitter',
                'com.discord',
                'com.github',
                'com.reddit',
                'org.telegram',
            ])
        )
        .default([
            'url',
            'email',
            'com.twitter',
            'com.discord',
            'com.github',
            'com.reddit',
            'org.telegram',
        ]),
});

handleTasks({} as any, {
    hi: {
        queue: 'hi',
        validate: z.object({ pen: z.string() }),
        handler: async (redis, data) => {
            console.log(data);
        },
    },
});
