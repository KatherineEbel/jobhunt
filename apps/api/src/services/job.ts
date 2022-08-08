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
export async function getAll(userId: string) {
  return Job.find({createdBy: userId})
}