import { Router } from 'express'
import { validate } from '../middleware/validatorMiddleware'
import * as yup from 'yup'
import { loginHandler, registerHandler } from '../controllers/auth'

export const authRoutes = Router()

const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email(),
  password: yup
    .string()
    .min(6, 'Please provide a stronger password')
    .required(),
})

const loginSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required(),
})

authRoutes.post('/register', validate(registerSchema), registerHandler)
authRoutes.post('/login', validate(loginSchema), loginHandler)
