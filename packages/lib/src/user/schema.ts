import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  location: yup.string().required(),
  email: yup.string().email(),
  password: yup
    .string()
    .min(6, 'Please provide a stronger password')
    .required(),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required(),
})

