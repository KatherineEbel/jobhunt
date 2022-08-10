import {ApplicationStatus, CreateJobRequest} from 'lib'
import mongoose from 'mongoose'
import Job from '../models/Job'

type Stats = {
  // eslint-disable-next-line no-unused-vars
  [key in ApplicationStatus] : number
}

const defaultStats = () => {
  return Object.values(ApplicationStatus).reduce((acc, value) => {
    acc[value] = 0
    return acc
  }, {} as Partial<Stats>)
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

/**
 * Get jobs by userId with pagination results
 * @params userId {string}
 * @returns Job[]
 */
export async function getPaginatedResults(userId: string) {
  const jobs = await Job.find({createdBy: userId})
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

export async function groupByStatus(userId: string) {
  const stats = await Job.aggregate()
    .match({createdBy: new mongoose.Types.ObjectId(userId)})
    .group({_id: '$status', count: {$sum: 1}})
  if (stats.length === 0) {
    return defaultStats()
  }
  return {
    ...stats.reduce((acc, stat) => {
      const {_id: title, count} = stat
      acc[title] = count
      return acc
    }, {}),
    monthlyTotal: [],
  }
}