import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  test,
} from '@jest/globals'
import { Express } from 'express'
import supertest from 'supertest'
import { db } from '../config'
import { createServer } from '../server'

const BASE_URL = `/api/v1`
const validUser = {
  firstName: 'John',
  lastName: 'Snow',
  email: 'john@example.com',
  password: 'password',
}

async function registerValidUser(app: Express) {
  await supertest(app)
    .post(`${BASE_URL}/auth/register`)
    .send(validUser)
    .expect(201)
}

describe('server', () => {
  let app: Express

  describe('no db routes', () => {
    beforeEach(async () => {
      app = await createServer()
    })

    afterEach(async () => {
      await db.connection.close()
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
  })
  describe('auth routes', () => {
    beforeEach(async () => {
      app = await createServer()
    })

    afterEach(async () => {
      await db.connection.dropDatabase()
      return db.connection.close()
    })

    test('register returns 400 with invalid request', async () => {
      await supertest(app)
        .post('/api/v1/auth/register')
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.error).toBeDefined()
        })
    })

    test('register returns 400 with all empty values', async () => {
      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: '   ',
          lastName: '   ',
          email: '   ',
        })
        .expect(400)
        .then((res) => {
          expect(res.body.error).toBeDefined()
        })
    })

    test('register route returns 201 when request valid', async function () {
      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password',
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          })
        })
    })

    test('emails must be valid', async () => {
      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Smith',
          email: 'johnsmith.foo',
          password: 'password',
        })
        .expect(422)
    })

    test('emails must be unique', async () => {
      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Smith',
          email: 'johnsmith@example.com',
          password: 'password',
        })
        .expect(201)

      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Smith',
          email: 'johnsmith@example.com',
          password: 'password',
        })
        .expect(422)
    })

    test('id is returned and password is not returned', async () => {
      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Smith',
          email: 'johnsmith@example.com',
          password: 'password',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.passwordHash).not.toBeDefined()
          expect(res.body.id).toBeDefined()
        })
    })

    test('token is returned when successful', async () => {
      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Smith',
          email: 'johnsmith@example.com',
          password: 'password',
        })
        .expect(201)
    })

    test('login route returns 200', async function () {
      await registerValidUser(app)
      const { email, password } = validUser
      await supertest(app)
        .post('/api/v1/auth/login')
        .send({ email, password })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('token')
        })
    })

    test('login route returns 401 with invalid password', async function () {
      await registerValidUser(app)
      const { email, password } = validUser
      await supertest(app)
        .post('/api/v1/auth/login')
        .send({ email, password: password.slice(1) })
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })

    test("login route returns 401 when user doesn't exist", async function () {
      const { password } = validUser
      await supertest(app)
        .post('/api/v1/auth/login')
        .send({ email: 'wrong@example.com', password: password.slice(1) })
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })
  })

  describe('user routes', () => {
    beforeEach(async () => {
      app = await createServer()
    })

    afterEach(async () => {
      await db.connection.close()
    })
    test('updateUser route returns 200', async function () {
      await supertest(app).patch('/api/v1/users/1').expect(200)
    })
  })

  describe('job routes', () => {
    beforeEach(async () => {
      app = await createServer()
    })

    afterEach(async () => {
      await db.connection.close()
    })
    const baseUrl = '/api/v1/jobs'
    test('"/" returns 200', async () => {
      await supertest(app).get(baseUrl).expect(200)
    })

    test('stats returns 200', async () => {
      await supertest(app).get(`${baseUrl}/stats`).expect(200)
    })

    test.skip('post returns 200', async () => {
      await supertest(app).post(baseUrl).expect(200)
    })

    test.skip('patch returns 200', async () => {
      await supertest(app).patch(`${baseUrl}/1`).expect(200)
    })

    test.skip('delete returns 200', async () => {
      await supertest(app).delete(`${baseUrl}/1`).expect(200)
    })
  })
})
