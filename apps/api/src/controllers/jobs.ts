import {Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {ApplicationStatus, ContractType, Job} from 'lib'
import {APIError} from '../errors/APIError'
import {AuthHandler, AuthRequest} from '../middleware/requireAuthMiddleware'
import { FilterQuery} from 'mongoose'
import * as jobService from '../services/job'

function ensureUser(req: AuthRequest) {
  const userId = req.user?.userId
  if (!userId) throw new APIError("Unauthorized", StatusCodes.UNAUTHORIZED)
  return userId
}

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
  const userId = ensureUser(req)
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
  // sort latest, oldest, a-z z-a
  const createdBy = ensureUser(req)
  const { status, contract, position, sort } = req.query
  const query: FilterQuery<Job>= {
    createdBy
  }
  if (typeof status === 'string' && status in ApplicationStatus) {
    query.status = status as ApplicationStatus
  }
  if (typeof contract === 'string' && contract in ContractType) {
    query.contract = contract.replace('time', '-time')
  }
  if (typeof position === 'string') {
    query.position = { $regex: position, $options: 'i'}
  }
  const result = await jobService.getPaginatedResults(query, sort as string)
  res.json(result)
}

/**
 * Update a job
 * @param req
 * @param res
 */
export const update: AuthHandler = async (req, res) => {
  const { id } = req.params
  const userId = ensureUser(req)
  const job = await jobService.updateOne(id, userId, req.body)
  if (!job) throw new APIError('Forbidden', StatusCodes.FORBIDDEN)
  res.json({job})
}

/**
 * Show Job stats
 * @param req
 * @param res
 */
export const stats: AuthHandler = async (req, res) => {
  const userId = ensureUser(req)
  const stats = await jobService.groupByStatus(userId)
  res.status(StatusCodes.OK).json({stats})
}
