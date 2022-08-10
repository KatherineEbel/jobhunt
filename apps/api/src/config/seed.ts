import mongoose from 'mongoose'
import Job from '../models/Job'
import {connect} from './db'
import mockData from './mock-data.json'

(async () => {
  try {
    await connect()
    await Job.deleteMany()


    console.log('seeding', mockData.length, 'jobs....')
    await Job.insertMany(mockData)
      .then(() => mongoose.connection.close())
      .then(() => {
        console.log('seed complete')
        process.exit(0)
      })
  } catch (e: unknown) {
    console.log((e as Error).message)
    process.exit(1)
  }
})()