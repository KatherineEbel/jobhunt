import { Express } from 'express'
import {AppJwtPayload} from './middleware/requireAuthMiddleware'
// import {AuthRequest} from './middleware/requireAuthMiddleware'

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedAuthRequestBody<T> extends Express.Request {
  body: T
  user: AppJwtPayload
}
