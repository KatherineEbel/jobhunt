import { Router } from 'express'
import { updateUser } from '../controllers/users'

export const userRoutes = Router()

userRoutes.patch('/:id', updateUser)
