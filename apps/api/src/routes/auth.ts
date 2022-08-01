import { Router } from 'express'
import { loginHandler, registerHandler } from '../controllers/auth'

export const authRoutes = Router()

authRoutes.post('/register', registerHandler)
authRoutes.post('/login', loginHandler)
