import {StatusCodes} from 'http-status-codes'
import {CreateJobRequest} from 'lib'
import {APIError} from '../errors/APIError'
import Job from '../models/Job'

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
  return { jobs, count: jobs.length, pages: 1}
}

export async function updateOne(jobId: string, createdBy: string, attrs: CreateJobRequest) {
  const job = await Job.findById(jobId).exec()
  if (!job) throw new APIError('Not Found', StatusCodes.NOT_FOUND)
  if (job.createdBy.toString() !== createdBy) throw new APIError('Forbidden', StatusCodes.FORBIDDEN)
  Object.assign(job, attrs)
  return job.save()
}