import { StatusCodes } from 'http-status-codes'
import { APIError } from '../errors/APIError'
import { User, UserDoc } from '../models/User'

/**
 * Insert user into database
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 */
export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const user = new User({ firstName, lastName, email })
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
