import { RequestHandler } from 'express'
import {AuthHandler} from '../middleware/requireAuthMiddleware'

/**
 * create a job
 * @param req
 * @param res
 */
export const create: AuthHandler = async (req, res) => {
  res.sendStatus(200)
}
/**
 * delete a job
 * @param req
 * @param res
 */
export const deleteOne: RequestHandler = async (req, res) => {
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
