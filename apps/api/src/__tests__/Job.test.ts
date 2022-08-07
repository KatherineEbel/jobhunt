import { expect, describe, it} from '@jest/globals'
import mongoose from 'mongoose'
import Job from '../models/Job'

describe('Job', function () {
  it('should be invalid if fields are empty', async function () {
    const job = new Job({})

    const result = job.validateSync()
    expect(result).not.toBeNull()
    expect(Object.keys(result?.errors || {})).toEqual(
      expect.arrayContaining(['company', 'position', 'createdBy'])
    )
  })

  it('should have default contract', async function () {
    const createdBy = new mongoose.Types.ObjectId()
    const job = new Job({
      company: 'My Company',
      position: 'Software Engineer',
      location: 'My City',
      createdBy,
    })

    const result = job.validateSync()
    expect(result).not.toBeDefined()
  })
})
