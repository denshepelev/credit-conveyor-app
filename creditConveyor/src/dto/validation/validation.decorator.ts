import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  buildMessage,
} from "class-validator";

export function MinAge(
  property: number,
  validationOptions?: ValidationOptions
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "MinAge",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          //const [relatedPropertyName] = args.constraints;
          //const relatedValue = (args.object as any)[relatedPropertyName];
          const _calculateAge = (birthday: Date) => {
            const ageDifMs = Date.now() - birthday.getTime();
            const ageDate = new Date(ageDifMs); // milliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          };
          let age: number;
          try {
            age = _calculateAge(new Date(Date.parse(value)));
            /*console.log(`value: ${value}`);
             *console.log(`relatedValue: ${relatedValue}`);
             *console.log(`age: ${age}`);
             *console.log(`property: ${property}`);
             */
          } catch (error) {
            return false;
          }

          return typeof value === "string" && age > args.constraints[0]; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix} should be more then $constraint1 to be a valid for loan apply `,
          validationOptions
        ),
      },
    });
  };
}
