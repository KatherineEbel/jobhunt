import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV}` })

const { MONGO_URI, PORT = 3001, JWT_SECRET = 'secretKey' } = process.env

// make TypeScript happy
if (!MONGO_URI || !PORT || !JWT_SECRET)
  throw new Error('app environment not configured')

export const appEnvironment = {
  port: PORT,
  mongoURI: MONGO_URI,
  jwtSecret: JWT_SECRET,
}
