import { registerDecorator, ValidationOptions } from "class-validator";

export const isPassword =
  (validationOptions?: ValidationOptions): PropertyDecorator =>
  (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: "isPassword",
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        // validate(value: string, _args: ValidationArguments) {
        //   return /^[a-zA-Z0-9!@#$%^&*]*$/.test(value);
        // }
        validate(value: string) {
          return /^[a-zA-Z0-9!@#$%^&*]*$/.test(value);
        }
      }
    });
  };
