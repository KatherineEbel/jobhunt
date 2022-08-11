import { Router } from 'express'
import {validate} from '../middleware/validatorMiddleware'
import { updateProfile } from '../controllers/profile'
import * as yup from 'yup'

export const profileRoutes = Router()

const profileSchema = yup.object().shape({
  firstName: yup.string().min(2, 'minimum length is 2'),
  lastName: yup.string().min(2, 'minimum length is 2'),
  email: yup.string().email('please provide a valid email'),
})

profileRoutes.patch('/', validate(profileSchema), updateProfile)
