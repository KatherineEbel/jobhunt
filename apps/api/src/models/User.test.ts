import { afterAll, beforeAll, expect, describe, it, afterEach } from '@jest/globals'
import { User } from '../models/User'
import * as db from '../config/testDb'

describe('UserModel', function () {
  it('should be invalid if fields are empty', async function () {
    const user = new User({})

    const result = user.validateSync()
    expect(result).not.toBeNull()
    expect(Object.keys(result?.errors || {})).toEqual(
      expect.arrayContaining(['email', 'lastName', 'firstName', 'location'])
    )
  })

  it('should hash a given password', async function () {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    })
    await user.hashPassword('password')
    expect(user.passwordHash).toBeDefined()
    expect(user.passwordHash).not.toEqual('password')
  })

  describe('saving', () => {
    beforeAll(async () => {
      await db.connect()
    })

    afterEach(async () => {
      await db.dropCollections()
    })

    afterAll(async () => {
      await db.dropDatabase()
    })

    it('should throw error if saved without passwordHash', async function () {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        location: 'New York City'
      })
      expect.assertions(1)
      try {
        await user.save()
      } catch (e: unknown) {
        expect((e as Error).message).toMatch(/passwordhash missing/i)
      }
    })
  })
})
