export class ConveyorValidationError extends Error {
  constructor(message: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, ConveyorValidationError.prototype);
    this.name = 'ConveyorValidationError';
  }

  getErrorMessage() {
    return this.message;
  }
}
