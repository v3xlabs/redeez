import { z, ZodType, ZodTypeAny } from 'zod';

import { Handler } from './Handler';

type ValidationResult<T> =
    | {
          success: true;
          value: T;
      }
    | {
          success: false;
      };

// export type Validator<T> = ZodType<T>; //(item: unknown) => Promise<ValidationResult<T>>;

export type TaskDefinition<K extends ZodTypeAny> = {
    queue: string;
    validate: ZodType<K>;
    handler: Handler<z.infer<K>>;
};
