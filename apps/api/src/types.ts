import { Express } from 'express'
import {AuthRequest} from './middleware/requireAuthMiddleware'

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedAuthRequestBody<T> extends AuthRequest {
  body: T
}
