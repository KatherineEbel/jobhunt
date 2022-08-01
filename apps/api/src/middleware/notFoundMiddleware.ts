import { RequestHandler } from 'express'

export const notFoundMiddleware: RequestHandler = (req, res) => {
  const path = req.path
  res.status(404).json({ error: `route not found for ${path}` })
}
