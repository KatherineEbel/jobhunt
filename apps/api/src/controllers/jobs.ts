import {RequestHandler, Response} from 'express'
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
  res.sendStatus(200)
}

/**
 * Get all Jobs
 * @param req {AuthRequest}
 * @param res { Response}
 */
export const getAll = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId
  console.log({userId})
  const jobs = await jobService.getAll(userId || '')
  console.log(jobs)
  res.json(jobs)
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
