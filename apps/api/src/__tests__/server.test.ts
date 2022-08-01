import { Express } from 'express'
import supertest from 'supertest'
import { createServer } from '../server'
import { db } from '../config'

describe('server', () => {
  let app: Express

  beforeEach(async () => {
    app = await createServer()
  })

  afterEach(() => {
    db.connection.close()
  })

  it('health check returns 200', async () => {
    await supertest(app)
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true)
      })
  })

  it('message endpoint says hello', async () => {
    await supertest(app)
      .get('/message/jared')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: 'hello jared' })
      })
  })

  it('should handle not found route', async function () {
    await supertest(app)
      .get('/foobar')
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ error: 'route not found for /foobar' })
      })
  })

  describe('auth routes', () => {
    test('register route returns 200', async function () {
      await supertest(app).post('/api/v1/auth/register').expect(200)
    })

    test('login route returns 200', async function () {
      await supertest(app).post('/api/v1/auth/login').expect(200)
    })
  })

  describe('user routes', () => {
    test('updateUser route returns 200', async function () {
      await supertest(app).patch('/api/v1/users/1').expect(200)
    })
  })

  describe('job routes', () => {
    const baseUrl = '/api/v1/jobs'
    test('"/" returns 200', async () => {
      await supertest(app).get(baseUrl).expect(200)
    })

    test('stats returns 200', async () => {
      await supertest(app).get(`${baseUrl}/stats`).expect(200)
    })

    test('post returns 200', async () => {
      await supertest(app).post(baseUrl).expect(200)
    })

    test('patch returns 200', async () => {
      await supertest(app).patch(`${baseUrl}/1`).expect(200)
    })

    test('delete returns 200', async () => {
      await supertest(app).delete(`${baseUrl}/1`).expect(200)
    })
  })
})
