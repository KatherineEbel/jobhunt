import express from 'express'
import {validate} from '../middleware/validatorMiddleware'
import { create, deleteOne, getAllPaginated, stats, update } from '../controllers/jobs'
import { createJobSchema} from 'lib'


export const jobRoutes = express.Router()

jobRoutes.get('/', getAllPaginated)

jobRoutes.post('/', validate(createJobSchema), create)
jobRoutes.get('/stats', stats)

jobRoutes.delete('/:id', deleteOne)
jobRoutes.patch('/:id', validate(createJobSchema), update)
