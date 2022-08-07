import Job from '../models/Job'

/**
 * Insert job into database
 * @param position
 * @param company
 * @param userId,
 */
export async function createJob(
  position: string,
  company: string,
  userId: string
) {
  return Job.create({position, company, createdBy: userId})
}