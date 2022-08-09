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
 * @params userId {string}
 * @returns Job[]
 */
export async function getPaginatedResults(userId: string) {
  const jobs = await Job.find({createdBy: userId})
  return { jobs, count: jobs.length, pages: 1}
}