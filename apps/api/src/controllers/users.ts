import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

export const updateUser: RequestHandler = (req, res) => {
  res.sendStatus(StatusCodes.OK)
}
