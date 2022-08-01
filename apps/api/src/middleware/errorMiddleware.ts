import { ErrorRequestHandler } from 'express'

export const errorMiddleware: ErrorRequestHandler = (err, req, res) => {
  res
    .status(500)
    .json({ error: `Oops! We encountered an error:\n ${err.toString()}` })
}
