import {RequestHandler, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {APIError} from '../errors/APIError'
import {AuthHandler, AuthRequest} from '../middleware/requireAuthMiddleware'
import * as jobService from '../services/job'


/**
 * create a job
 * @param req
 * @param res
 */
export const create: AuthHandler = async (req, res) => {
  const createdBy = req.user?.userId
  const jobRequest = {...req.body, createdBy}
  const job = await jobService.createJob(jobRequest)
  res.status(201).json({ job })
}
/**
 * delete a job
 * @param req
 * @param res
 */
export const deleteOne: AuthHandler = async (req, res) => {
  const { id } = (req.params)
  const userId = req.user?.userId
  if (!userId) throw new APIError("Unauthorized", StatusCodes.UNAUTHORIZED)
  const doc = await jobService.deleteOne(id, userId)
  if (!doc) throw new APIError('Forbidden', StatusCodes.FORBIDDEN)
  res.status(StatusCodes.OK).json({job: doc.toJSON()})
}

/**
 * Get paginated jobs for current user
 * @param req {AuthRequest}
 * @param res { Response}
 */
export const getAllPaginated = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId
  const result = await jobService.getPaginatedResults(userId || '')
  res.json(result)
}

/**
 * Update a job
 * @param req
 * @param res
 */
export const update: AuthHandler = async (req, res) => {
  const { id } = req.params
  const userId = req.user?.userId
  if (!userId) throw new APIError('Unauthorized', StatusCodes.UNAUTHORIZED)
  const job = await jobService.updateOne(id, userId, req.body)
  if (!job) throw new APIError('Forbidden', StatusCodes.FORBIDDEN)
  res.json({job})
}

/**
 * Show Job stats
 * @param req
 * @param res
 */
export const stats: RequestHandler = async (req, res) => {
  res.sendStatus(200)
}
