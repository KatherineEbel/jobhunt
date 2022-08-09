import { StatusCodes } from 'http-status-codes'
import {DBError} from '../errors/DBError'
import { APIError } from '../errors/APIError'
import {User, UserDoc} from '../models/User'
import { JHUser} from 'lib'

/**
 * Insert user into database
 * @param firstName
 * @param lastName
 * @param location
 * @param email
 * @param password
 */
export async function createUser(
  firstName: string,
  lastName: string,
  location: string,
  email: string,
  password: string
) {
  const user = new User({ firstName, lastName, location, email })
  await user.hashPassword(password)
  return await user.save()
}

/**
 * find user by email
 * @param email
 */
export const getOneByEmail = async (email: string): Promise<UserDoc> => {
  const user = await User.findOne({ email }).exec()
  if (user === null)
    throw new APIError("user doesn't exist", StatusCodes.UNAUTHORIZED)
  return user
}

/**
 * find a user by id
 * @param id
 */
export const findById = async (id: string): Promise<UserDoc> => {
  const user = await User.findById(id).exec()
  if (user === null)
    throw new APIError("user doesn't exist", StatusCodes.UNAUTHORIZED)
  return user
}

export const updateUser = async (userId: string, attrs: Partial<JHUser>): Promise<UserDoc> => {
  const user = await findById(userId)
  Object.assign(user, attrs)
  try {
    await user.save()
    return user
  } catch (e: unknown) {
    throw new DBError((e as Error).message)
  }
}