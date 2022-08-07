import { RequestHandler } from 'express'
import {StatusCodes} from 'http-status-codes'
import {APIError} from '../errors/APIError'
import {TypedAuthRequestBody} from '../types'
import {AuthHandler} from '../middleware/requireAuthMiddleware'
import * as jobService from '../services/job'


/**
 * create a job
 * @param req
 * @param res
 */
export const create: AuthHandler = async (req: TypedAuthRequestBody<{
  position: string,
  company: string,
}>, res) => {
  const {position, company} = req.body
  const createdBy = req.user?.user_id
  if (!createdBy) throw new APIError("Please log in first", StatusCodes.UNAUTHORIZED)
  const job = await jobService.createJob(position, company, createdBy)
  res.status(201).json({ job })
}
/**
 * delete a job
 * @param req
 * @param res
 */
export const deleteOne: RequestHandler = async (req, res) => {
  // const job: Job = {...req.body, createdBy: req.user.userId }
  res.sendStatus(200)
}

/**
 * Get all Jobs
 * @param req
 * @param res
 */
export const getAll: RequestHandler = async (req, res) => {
  res.sendStatus(200)
}

/**
 * Update a job
 * @param req
 * @param res
 */
export const update: RequestHandler = async (req, res) => {
  res.sendStatus(200)
}

/**
 * Show Job stats
 * @param req
 * @param res
 */
export const stats: RequestHandler = async (req, res) => {
  res.sendStatus(200)
}
