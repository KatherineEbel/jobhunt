import { ErrorRequestHandler } from 'express'
import { APIError } from '../errors/APIError'

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  if (err instanceof APIError) {
    res.status(err.statusCode).json({ error: err.message })
    return
  }
  const { message, statusCode } = APIError.newError(err)
  res.status(statusCode).json({ error: message })
}
