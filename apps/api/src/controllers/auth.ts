import { RequestHandler } from 'express'
import { APIError } from '../errors/APIError'
import {LoginUser, RegisterUser} from 'lib'
import { TypedRequestBody } from '../types'
import * as userService from '../services/user'
import { StatusCodes } from 'http-status-codes'

export const registerHandler: RequestHandler = async (
  req: TypedRequestBody<RegisterUser>,
  res
) => {
  const { firstName, lastName, location, email, password } = req.body
  const user = await userService.createUser(
    firstName,
    lastName,
    location,
    email,
    password
  )
  res.status(StatusCodes.CREATED).json({user})
}

export const loginHandler: RequestHandler = async (
  req: TypedRequestBody<LoginUser>,
  res
) => {
  const { email, password } = req.body
  const user = await userService.getOneByEmail(email)
  if (!(await user.authenticate(password)))
    throw new APIError('invalid credentials', StatusCodes.UNAUTHORIZED)
  res.json({
    user: {
      ...user.toJSON(),
      token: await user.getToken(),
    }
  })
}
