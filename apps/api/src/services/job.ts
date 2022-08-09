import {CreateJobRequest} from 'lib'
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

/**
 * Update a Job
 * @param jobId
 * @param createdBy
 * @param attrs
 */
export async function updateOne(jobId: string, createdBy: string, attrs: CreateJobRequest) {
  return Job.findOneAndUpdate({_id: jobId, createdBy}, attrs, { new: true})
}

export async function deleteOne(jobId: string, createdBy: string) {
  return Job.findOneAndDelete({_id: jobId, createdBy})
}