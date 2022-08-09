export class DBError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, DBError.prototype)
  }
}
