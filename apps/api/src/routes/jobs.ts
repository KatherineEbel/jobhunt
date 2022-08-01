import express from 'express'
import { create, deleteOne, getAll, stats, update } from '../controllers/jobs'

export const jobRoutes = express.Router()

jobRoutes.get('/', getAll)
jobRoutes.post('/', create)
jobRoutes.get('/stats', stats)

jobRoutes.delete('/:id', deleteOne)
jobRoutes.patch('/:id', update)
