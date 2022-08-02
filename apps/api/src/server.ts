import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { connect } from './config'
import { errorMiddleware, notFoundMiddleware } from './middleware'
import { authRoutes, userRoutes, jobRoutes } from './routes'
import { log } from 'logger'

export const createServer = async () => {
  const result = await connect()
  if (result) {
    log(result)
    process.exit(1)
  }

  const app = express()

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors())
    .use('/api/v1/auth', authRoutes)
    .use('/api/v1/users', userRoutes)
    .use('/api/v1/jobs', jobRoutes)
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` })
    })
    .get('/health', (req, res) => {
      return res.json({ ok: true })
    })

  app.use(notFoundMiddleware)
  app.use(errorMiddleware)
  return app
}
