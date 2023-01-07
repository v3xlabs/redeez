import { ZodSchema } from 'zod';

import { Validator } from '../TaskDefinition';

export const zodValidator =
    <T>(schema: ZodSchema<T>): Validator<T> =>
    async (item: unknown) => {
        const parsed = await schema.safeParseAsync(item);

        if (!parsed.success) return { success: false };

        return { success: true, value: parsed.data };
    };
