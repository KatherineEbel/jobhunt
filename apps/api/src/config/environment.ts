import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV}` })

const { MONGO_URI, PORT = 3001 } = process.env

if (!MONGO_URI || !PORT) throw new Error('app environment not configured')

export const appEnvironment = {
  port: PORT,
  mongoURI: MONGO_URI,
}
