import express from 'express'
import {validate} from '../middleware/validatorMiddleware'
import { create, deleteOne, getAll, stats, update } from '../controllers/jobs'
import * as yup from 'yup'


export const jobRoutes = express.Router()

jobRoutes.get('/', getAll)

const jobSchema = yup.object().shape({
  company: yup.string().required(),
  position: yup.string().required(),
})

jobRoutes.post('/', validate(jobSchema), create)
jobRoutes.get('/stats', stats)

jobRoutes.delete('/:id', deleteOne)
jobRoutes.patch('/:id', update)
