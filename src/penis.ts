import zod from 'zod';

type TaskThing<K extends zod.ZodSchema, Penis extends zod.infer<K>> = {
    queue: string;
    validate: K;
    fuckU: (entry: Penis) => void;
};

function fuck<K extends zod.ZodSchema, Penis extends zod.infer<K>>(
    josh: TaskThing<K, Penis>
) {
    return 'hi';
}

fuck({
    queue: 'pen',
    validate: zod.object({ yes: zod.string() }),
    fuckU(entry) {
        
    },
});
