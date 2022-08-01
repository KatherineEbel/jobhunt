import mongoose from 'mongoose'
import { appEnvironment } from '../config'

type ReturnType = string | null
export const connect = async (): Promise<ReturnType> => {
  try {
    await mongoose.connect(appEnvironment.mongoURI)
    return null
  } catch (e: unknown) {
    return (e as Error).message
  }
}

const db = mongoose

export { db }
