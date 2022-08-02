import { StatusCodes } from 'http-status-codes'

const MONGO_UNIQUE_ERROR_CODE = 11000

export class APIError extends Error {
  statusCode: number

  constructor(message: string, code: number = StatusCodes.BAD_REQUEST) {
    super(message)
    Object.setPrototypeOf(this, APIError.prototype)
    this.statusCode = code
  }

  private static isValidationError(err: any): boolean {
    return (err.name && err.name === 'ValidationError') || err.errors
  }

  private static isUniqueError(err: any): boolean {
    return err.code && err.code === MONGO_UNIQUE_ERROR_CODE
  }

  static newError(err?: any): APIError {
    let error = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: 'Oops! Something unexpected occurred',
    }
    if (APIError.isValidationError(err)) {
      error.status =
        err.type === 'required'
          ? StatusCodes.BAD_REQUEST
          : StatusCodes.UNPROCESSABLE_ENTITY
      error.error = err.message
    } else if (APIError.isUniqueError(err)) {
      error.status = StatusCodes.UNPROCESSABLE_ENTITY
      error.error = `${err.keyValue.email} is not available`
    }
    return new APIError(error.error, error.status)
  }
}
