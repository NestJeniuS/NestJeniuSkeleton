import { ValidationOptions, registerDecorator } from 'class-validator'
export function IsCategoryId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCategoryId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, ValidationArguments) {
          // 모든 키가 1~18 사이인지 확인합니다.
          return Object.keys(value).every(
            (key) => 1 <= Number(key) && Number(key) <= 17,
          )
        },
      },
    })
  }
}
