import {CreateJobRequest, ApplicationStatus, ContractType, Status, Contract} from '../job'

import * as yup from 'yup'

export type ObjectSchema = yup.ObjectSchema<any>

export const createJobSchema = yup.object().shape({
  company: yup.string().required(),
  position: yup.string().required(),
  location: yup.string().required(),
  status: yup.mixed<ApplicationStatus>().oneOf([...Status]),
  contract: yup.mixed<ContractType>().oneOf([...Contract]),
})

export const searchFormSchema = yup.object().shape({
  position: yup.string()
})

export async function validateSchema(schema: ObjectSchema, request: CreateJobRequest) {
  return await schema.validate(request)
}
