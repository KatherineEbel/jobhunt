import mongoose from 'mongoose'
import { appEnvironment } from '../config'

type ReturnType = string | null
export const connect = async (): Promise<ReturnType> => {
  try {
    await mongoose.connect(appEnvironment.mongoURI)
    console.log('connected to mongodb')
    return null
  } catch (e: unknown) {
    console.log('error connecting to mongodb', (e as Error).message)
    return (e as Error).message
  }
}

const db = mongoose

export { db }
