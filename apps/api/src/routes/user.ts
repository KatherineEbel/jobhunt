import { Router } from 'express'
import {validate} from '../middleware/validatorMiddleware'
import {requireAuth} from '../middleware/requireAuthMiddleware'
import { updateProfile } from '../controllers/users'
import * as yup from 'yup'

export const userRoutes = Router()

const profileSchema = yup.object().shape({
  firstName: yup.string().min(2, 'minimum length is 2'),
  lastName: yup.string().min(2, 'minimum length is 2'),
  email: yup.string().email('please provide a valid email'),
})

userRoutes.patch('/:id', requireAuth, validate(profileSchema), updateProfile)
