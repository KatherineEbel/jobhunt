import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer | null = null

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)
}

export const dropDatabase = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  }
}

export const dropCollections = async () => {
  if (!mongoServer) return
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key]?.deleteMany({})
  }
}
