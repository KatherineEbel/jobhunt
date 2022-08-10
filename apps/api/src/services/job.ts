import {ApplicationStats, ApplicationStatus, ContractType, CreateJobRequest, formatMonthYear} from 'lib'
import mongoose, {FilterQuery} from 'mongoose'
import { Job as JHJob } from 'lib'
import Job from '../models/Job'

export interface JobQuery {
  status: ApplicationStatus
  contract: ContractType
  createdBy: string
  sort: string
  search: string
}


const defaultStats = () => {
  return Object.values(ApplicationStatus).reduce((acc, value) => {
    acc[value] = 0
    return acc
  }, {} as Partial<ApplicationStats>)
}


/**
 * Insert job into database
 * @param {CreateJobRequest} request
 */
export async function createJob(
  request: CreateJobRequest,
) {
  return Job.create(request)
}

const sortMap: {[key: string] : string} = {
  latest: '-createdAt',
  oldest: 'createdAt',
  'a-z': 'position',
  'z-a': '-position'
}


/**
 * Get jobs by query with pagination results
 * @params query {FilterQuery<JHJob>}
 * @returns {}
 */
export async function getPaginatedResults(query: FilterQuery<JHJob>, sort: string) {
  const jobQuery = Job.find(query)
  if ((sortMap[sort])) {
    jobQuery.sort(sort)
  }
  const jobs = await jobQuery
  return {jobs, count: jobs.length, pages: 1}
}

/**
 * Update a Job
 * @param jobId
 * @param createdBy
 * @param attrs
 */
export async function updateOne(jobId: string, createdBy: string, attrs: CreateJobRequest) {
  return Job.findOneAndUpdate({_id: jobId, createdBy}, attrs, {new: true})
}

/**
 * delete job by Id for user
 * @param jobId
 * @param createdBy
 * @returns deleted doc
 */
export async function deleteOne(jobId: string, createdBy: string) {
  return Job.findOneAndDelete({_id: jobId, createdBy})
}

const groupBy = async (userId: string, prop: keyof JHJob) => {
  return Job.aggregate()
    .match({createdBy: new mongoose.Types.ObjectId(userId)})
    .group({_id: `$${prop}`, count: {$sum: 1}})
}

const monthlyApplications = async (userId: string) => {
  const applications = await Job.aggregate<{_id: {year: number, month: number}, count: number}>()
    .match({createdBy: new mongoose.Types.ObjectId(userId)})
    .group({
      _id: {
        year: {
          $year: '$createdAt',
        },
        month: {
          $month: '$createdAt',
        },
      },
      count: { $sum: 1},
    })
    .sort({ '_id.year': -1, '_id.month': -1})
    .limit(6)

  return applications.map(({_id: { year, month}, count}) => {
    return {
      date: formatMonthYear(month, year),
      count,
    }
  }).reverse()
}

/**
 * Group jobs by Application status
 * @param userId
 */
export async function groupByStatus(userId: string) {
  const stats = await groupBy(userId, 'status')
  if (stats.length === 0) {
    return defaultStats()
  }
  return {
    ...stats.reduce((acc, stat) => {
      const {_id: title, count} = stat
      acc[title] = count
      return acc
    }, {}),
    applications: await monthlyApplications(userId),
  }
}
