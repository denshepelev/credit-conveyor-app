export class ConveyorRejectionError extends Error {
  constructor(message: string) {
    super(`CC denied, reason: ${message}`);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, ConveyorRejectionError.prototype);
    this.name = "ConveyorRejectionError";
  }

  getErrorMessage() {
    return this.message;
  }
}
