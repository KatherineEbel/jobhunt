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