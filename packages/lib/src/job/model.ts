/* eslint-disable no-unused-vars */

export enum ContractType {
  fulltime = 'full-time',
  parttime = 'part-time',
  remote = 'remote',
  internship = 'internship',
}

export enum ApplicationStatus {
  declined = 'declined',
  interview = 'interview',
  pending = 'pending',
  offer = 'offer',
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

export interface PageData {
  count: number
  pages: number
}

export type JobResponse = Job & {
  createdAt: string
  updatedAt: string
}

export type UserJobsResponse = PageData & {
  jobs: JobResponse[]
}

export type CreateJobRequest = Omit<Job, 'createdBy'>

export type CreateJobResponse = { job: JobResponse}

export type ApplicationStats = {
  [key in ApplicationStatus]: number
}

type MonthlyTotal = {
  date: string
  count: number
}

export type ApplicationStatusStats = {
  stats: ApplicationStats & {
    applications: MonthlyTotal[]
  }
}

// export type JobSortDescriptor = 'latest' | 'oldest' | 'a-z' | 'z-a'

export enum JobSortDescriptor {
  latest = 'latest',
  oldest = 'oldest',
  ascending = 'a-z',
  descending = 'z-a'
}

export interface JobQuery {
  status: ApplicationStatus
  contract: ContractType
  sort: JobSortDescriptor
  position: string
}
