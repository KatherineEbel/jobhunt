import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { connect } from './config'
import { errorMiddleware, notFoundMiddleware } from './middleware'
import { authRoutes, userRoutes, jobRoutes } from './routes'

export const createServer = async () => {
  const result = await connect()
  if (result) {
    console.error(result)
    process.exit(1)
  }
  const app = express()

  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/jobs', jobRoutes)

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors())
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
