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
  // eslint-disable-next-line no-unused-vars
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

/* eslint-disable no-unused-vars */
export enum JobSortDescriptor {
  latest = 'latest',
  oldest = 'oldest',
  ascending = 'a-z',
  descending = 'z-a'
}

export interface JobQuery {
  contract: ContractType
  page: number
  position: string
  sort: JobSortDescriptor
  status: ApplicationStatus
}

export interface ListResponse<T> {
  page: number
  perPage: number
  total: number
  totalPages: number
  data: T[]
}

export type JobListResponse = ListResponse<JobResponse>
