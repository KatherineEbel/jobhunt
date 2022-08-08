import { Router } from 'express'
import {loginSchema, registerSchema} from 'lib/src'
import { validate } from '../middleware/validatorMiddleware'
import { loginHandler, registerHandler } from '../controllers/auth'

export const authRoutes = Router()

authRoutes.post('/register', validate(registerSchema), registerHandler)
authRoutes.post('/login', validate(loginSchema), loginHandler)
