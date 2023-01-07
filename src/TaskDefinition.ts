import { Handler } from './Handler';

type ValidationResult<T> =
    | {
          success: true;
          value: T;
      }
    | {
          success: false;
      };

export type Validator<T> = (item: unknown) => Promise<ValidationResult<T>>;

export type TaskDefinition<Task> = {
    queue: string;
    handler: Handler<Task>;
    validate: Validator<Task>;
};
