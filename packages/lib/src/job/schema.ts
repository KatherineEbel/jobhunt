import {CreateJobRequest, ApplicationStatus, ContractType} from '../job'

import * as yup from 'yup'

export type ObjectSchema = yup.ObjectSchema<any>

export const createJobSchema = yup.object().shape({
  company: yup.string().required(),
  position: yup.string().required(),
  location: yup.string().required(),
  status: yup.mixed<ApplicationStatus>().oneOf(Object.values(ApplicationStatus)),
  contract: yup.mixed<ContractType>().oneOf(Object.values(ContractType)),
})

export const searchFormSchema = yup.object().shape({
  query: yup.string()
})

export async function validateSchema(schema: yup.ObjectSchema<any>, request: CreateJobRequest) {
  return await schema.validate(request)
}
