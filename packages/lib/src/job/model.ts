/* eslint-disable no-unused-vars */

export const Contract = ['full-time', 'part-time', 'remote', 'internship'] as const
export type ContractType = typeof Contract[number]

export const Status = ['declined', 'interview', 'pending', 'offer'] as const
export type ApplicationStatus = typeof Status[number]

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

export interface ListResponse<T> {
  page: number
  perPage: number
  total: number
  totalPages: number
  data: T[]
}

export type JobListResponse = ListResponse<JobResponse>
