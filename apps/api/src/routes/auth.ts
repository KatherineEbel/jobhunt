import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import {loginSchema, registerSchema} from 'lib'
import { validate } from '../middleware/validatorMiddleware'
import { loginHandler, registerHandler } from '../controllers/auth'

export const authRoutes = Router()

const limiter = rateLimit({
  max: 10,
  message: 'Max requests reached. Please try again in 15 minutes',
  legacyHeaders: false,
  standardHeaders: true,
  windowMs: 15 * 60 * 1000,
})

if (process.env.NODE_ENV !== 'test') {
  authRoutes.use(limiter)
}


authRoutes.post('/register', validate(registerSchema), registerHandler)
authRoutes.post('/login', validate(loginSchema), loginHandler)
