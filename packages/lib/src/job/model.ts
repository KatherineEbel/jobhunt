/* eslint-disable no-unused-vars */

export enum ContractType {
  fullTime = 'full-time',
  partTime = 'part-time',
  remote = 'remote',
  internship = 'internship',
}

export enum ApplicationStatus {
  declined = 'declined',
  interview = 'interview',
  pending = 'pending',
  accepted = 'accepted',
}

export interface Job {
  company: string
  position: string
  status: ApplicationStatus
  contract: ContractType
  location: string
  createdBy: string
  id?: string
}

export interface UserJobsResponse {
  jobs: Job[]
  count: number
  pages: number
}

export type CreateJobRequest = Omit<Job, 'createdBy'>

export type CreateJobResponse = { job: Job}