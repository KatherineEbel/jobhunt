import {StatusCodes} from 'http-status-codes'
import {APIError} from '../errors/APIError'
import {updateUser} from '../services/user'
import {AuthHandler} from '../middleware/requireAuthMiddleware'

export const updateProfile: AuthHandler = async (req, res) => {
  if (!req.user) throw new APIError('please login', StatusCodes.FORBIDDEN)
  const user = await updateUser(req.user.userId, req.body)
  const token = await user.getToken()
  res.json({...user.toJSON(), token})
}
