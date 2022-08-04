import {StatusCodes} from 'http-status-codes'
import {APIError} from '../errors/APIError'
import {updateUser} from '../services/user'
import {TypedAuthRequestBody} from '../types'
import {AuthHandler} from '../middleware/requireAuthMiddleware'

export const updateProfile: AuthHandler = async (req: TypedAuthRequestBody<{email: string, firstName: string, lastName: string}>, res) => {
  if (!req.user) throw new APIError('please login', StatusCodes.FORBIDDEN)
  const user = await updateUser(req.user.user_id, req.body)
  const token = await user.getToken()
  res.json({...user.toJSON(), token})
}
