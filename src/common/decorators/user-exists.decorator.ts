import { registerDecorator, ValidationOptions } from 'class-validator';
import { UserExistsValidator } from '../validators/user-exists.validator';

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsValidator,
    });
  };
}
