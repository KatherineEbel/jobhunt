import { RequestHandler } from 'express'
import { APIError } from '../errors/APIError'
import { IUser } from '../models/User'
import { TypedRequestBody } from '../types'
import * as userService from '../services/user'
import { StatusCodes } from 'http-status-codes'

type RegisterRequest = Omit<IUser, 'passwordHash'> & { password: string }
export const registerHandler: RequestHandler = async (
  req: TypedRequestBody<RegisterRequest>,
  res
) => {
  const { firstName, lastName, email, password } = req.body
  const user = await userService.createUser(
    firstName,
    lastName,
    email,
    password
  )
  res.status(StatusCodes.CREATED).json(user)
}

type LoginRequest = Pick<IUser, 'email'> & { password: string }
export const loginHandler: RequestHandler = async (
  req: TypedRequestBody<LoginRequest>,
  res
) => {
  const { email, password } = req.body
  const user = await userService.getOneByEmail(email)
  if (!(await user.authenticate(password)))
    throw new APIError('invalid credentials', StatusCodes.UNAUTHORIZED)
  res.json({
    name: user.fullName(),
    token: await user.getToken(),
    email: user.email,
    id: user._id
  })
}
