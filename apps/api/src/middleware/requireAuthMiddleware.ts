import {NextFunction, Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import jwt, {JwtPayload, TokenExpiredError} from 'jsonwebtoken'
import {appEnvironment} from '../config'
import {APIError} from '../errors/APIError'

export type AppJwtPayload = JwtPayload & { userId: string }
export interface AuthRequest extends Request {
  user?: AppJwtPayload
}

export type AuthHandler = typeof requireAuth

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth) throw new APIError('please log in first', StatusCodes.UNAUTHORIZED)
  const [type, token] = auth.split(' ')
  if (type.toLowerCase() !== 'bearer' || !token.length) throw new APIError('invalid auth header', StatusCodes.BAD_REQUEST)
  try {
    req.user = jwt.verify(token, appEnvironment.jwtSecret) as AppJwtPayload
  } catch (e: unknown) {
    if ((e as TokenExpiredError).message === 'jwt expired') {
      throw new APIError('session expired, please log in', StatusCodes.UNAUTHORIZED)
    }
  }
  next()
}

