import {ApplicationStats, Status, CreateJobRequest, formatMonthYear} from 'lib'
import mongoose, {FilterQuery} from 'mongoose'
import { Job as JHJob } from 'lib'
import Job from '../models/Job'

const defaultStats = () => {
  return Status.reduce((acc, value) => {
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

interface QueryOptions {
  sort: string
  limit: number
  skip: number
}

/**
 * Get jobs by query with pagination results
 * @param query {FilterQuery<JHJob>}
 * @param options {QueryOptions}
 */
export async function getPaginatedResults(query: FilterQuery<JHJob>, { sort, skip, limit}: QueryOptions) {
  const jobQuery = Job.find(query)
    .sort(sortMap[sort] || 'latest')
    .skip(skip)
    .limit(limit)

  const data = await jobQuery
  const total = await Job.countDocuments(query)
  const totalPages = Math.ceil(total / limit) || 1
  return {data, total, perPage: limit, totalPages}
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
