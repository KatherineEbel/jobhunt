import express from 'express'
import {validate} from '../middleware/validatorMiddleware'
import { create, deleteOne, getAll, stats, update } from '../controllers/jobs'
import { createJobSchema} from 'lib'


export const jobRoutes = express.Router()

jobRoutes.get('/', getAll)

jobRoutes.post('/', validate(createJobSchema), create)
jobRoutes.get('/stats', stats)

jobRoutes.delete('/:id', deleteOne)
jobRoutes.patch('/:id', update)
