import {afterEach, beforeEach, describe, expect, it, test,} from '@jest/globals'
import {Express} from 'express'
import supertest from 'supertest'
import {db} from '../config'
import {createServer} from '../server'

const BASE_URL = `/api/v1`

type AuthUser = { token: string, id: string }

const validUser = {
  firstName: 'John',
  lastName: 'Snow',
  location: 'New York City',
  email: 'john@example.com',
  password: 'password',
}


async function registerValidUser(app: Express) {
  const url = `${BASE_URL}/auth/register`
  await supertest(app)
    .post(url)
    .send(validUser)
    .expect(201)
}

async function loginUser(app: Express, user: typeof validUser): Promise<AuthUser> {
  const {email, password} = user
  let authUser = {token: '', id: ''}
  await supertest(app)
    .post(`${BASE_URL}/auth/login`)
    .send({email, password})
    .expect(200)
    .then(res => {
      authUser.token = res.body.token
      authUser.id = res.body.id
    })
  expect(Object.values(authUser).every(Boolean)).toBe(true)
  return authUser
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
          expect(res.body).toEqual({message: 'hello jared'})
        })
    })

    it('should handle not found route', async function () {
      await supertest(app)
        .get('/foobar')
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({error: 'route not found for /foobar'})
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
          location: 'New York City',
          email: 'john@example.com',
          password: 'password',
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject({
            firstName: 'John',
            lastName: 'Doe',
            location: 'New York City',
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
          location: 'New York City',
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
          location: 'New York City',
          email: 'johnsmith@example.com',
          password: 'password',
        })
        .expect(201)

      await supertest(app)
        .post('/api/v1/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Smith',
          location: 'New York City',
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
          location: 'New York City',
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
          location: 'New York City',
          email: 'johnsmith@example.com',
          password: 'password',
        })
        .expect(201)
    })

    test('login route returns 200', async function () {
      await registerValidUser(app)
      const {email, password} = validUser
      await supertest(app)
        .post('/api/v1/auth/login')
        .send({email, password})
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('token')
        })
    })

    test('login route returns 401 with invalid password', async function () {
      await registerValidUser(app)
      const {email, password} = validUser
      await supertest(app)
        .post('/api/v1/auth/login')
        .send({email, password: password.slice(1)})
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })

    test('login route returns 401 when user doesn\'t exist', async function () {
      const {password} = validUser
      await supertest(app)
        .post('/api/v1/auth/login')
        .send({email: 'wrong@example.com', password: password.slice(1)})
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })
  })

  describe('auth routes', () => {
    let authUser: AuthUser
    beforeAll(async () => {
      app = await createServer()
      await registerValidUser(app)
      authUser = await loginUser(app, validUser)
    })
    afterAll(async () => {
      await db.connection.dropDatabase()
      await db.connection.close()
    })

    describe('user routes', () => {
      describe('when logged in', () => {
        test('updateUser route returns 200', async function () {
          await supertest(app).patch(`/api/v1/users/${authUser.id}`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .send({email: 'new@example.com', firstName: 'Newname'})
            .expect(200)
            .expect(res => {
              expect(res.body.email).toBe('new@example.com')
              expect(res.body.firstName).toBe('Newname')
              expect(res.body.lastName).toBe(validUser.lastName)
            })
        })
      })
    })

    describe.skip('job routes', () => {
      describe('when logged in', () => {
        const baseUrl = '/api/v1/lib'

        test('get "/" returns 200', async () => {
          expect(authUser).toBeDefined()
          await supertest(app).get(baseUrl)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
        })

        test('post with valid values returns 201', async () => {
          await supertest(app).post(baseUrl)
            .send({
              position: 'Software Engineer',
              company: 'Mozilla',
            })
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(201)
            .expect(async res => {
              const {job} = res.body
              expect(job).toBeDefined()
              expect(job.position).toBe('Software Engineer')
              expect(job.company).toBe('Mozilla')
              expect(job.contract).toBe('full-time')
              expect(job.status).toBe('pending')
              expect(job.createdBy).toBe(authUser.id)
            })
        })

        test('post without auth returns 401 values returns 201', async () => {
          await supertest(app).post(baseUrl)
            .set('Authorization', '')
            .send({
              position: 'Software Engineer',
              company: 'Mozilla',
            })
            .expect(401)
            .expect(async res => {
              expect(res.body.error).toBeDefined()
            })
        })

        test('post with invalid values returns 400', async () => {
          await supertest(app).post(baseUrl)
            .send({
              position: '',
              company: '',
            })
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(400)
            .expect(async res => {
              expect(res.body.error).toBeDefined()
            })
        })



        test.skip('patch returns 200', async () => {
          await supertest(app).patch(`${baseUrl}/1`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
        })

        test.skip('delete returns 200', async () => {
          await supertest(app).delete(`${baseUrl}/1`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
        })
      })
    })
  })
})
