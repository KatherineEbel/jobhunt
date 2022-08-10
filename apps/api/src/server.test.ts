import {faker} from '@faker-js/faker'
import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, test,} from '@jest/globals'
import {Express} from 'express'
import {ApplicationStatus, AuthUser, ContractType, CreateJobRequest, CreateJobResponse, JobResponse} from 'lib'
import mongoose from 'mongoose'
import supertest from 'supertest'
import {db} from './config'
import {createServer} from './server'
import Job from './models/Job'

const BASE_URL = `/api/v1`


const validUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  location: faker.address.cityName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
}

const otherUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  location: faker.address.cityName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
}

const generateJob = (): CreateJobRequest => {
  const status = Object.values(ApplicationStatus)[Math.floor(Math.random() * 4)]
  return {
    company: faker.company.name(),
    location: faker.address.city(),
    position: faker.hacker.noun(),
    status,
    contract: ContractType.fullTime
  }
}

async function registerUser(app: Express, user: typeof otherUser) {
  const url = `${BASE_URL}/auth/register`
  return await supertest(app)
    .post(url)
    .send(user)
    .expect(201)
    .then(res => res.body.user as Omit<AuthUser, 'token'>)
}

async function registerValidUser(app: Express) {
  return registerUser(app, validUser)
}

async function registerOtherUser(app: Express) {
  return registerUser(app, otherUser)
}

async function loginUser(app: Express, user: typeof validUser): Promise<AuthUser> {
  const {email, password} = user
  return await supertest(app)
    .post(`${BASE_URL}/auth/login`)
    .send({email, password})
    .expect(200)
    .then(res => {
      return res.body.user as AuthUser
    })
}

async function insertJob(app: Express, user: AuthUser, job: CreateJobRequest) {
  return await supertest(app).post(`/api/v1/jobs`)
    .send(job)
    .set('Authorization', `Bearer ${user.token}`)
    .expect(201)
    .then(res => res.body as CreateJobResponse)
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
          expect(res.body).toHaveProperty('user')
          expect(res.body.user).toEqual(expect.objectContaining({
            firstName: 'John',
            lastName: 'Doe',
            location: 'New York City',
            email: 'john@example.com',
          }))
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
          const { user } = res.body
          expect(user.passwordHash).not.toBeDefined()
          expect(user.id).toBeDefined()
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
          const {user} = res.body
          expect(user).toHaveProperty('token')
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

  describe('require auth routes', () => {
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

    describe('profile routes', () => {
      describe('when logged in', () => {
        test('updateUser route returns 200', async function () {
          await supertest(app).patch(`/api/v1/profile/${authUser.id}`)
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

    describe('job routes', () => {
      describe('when logged in', () => {
        const baseUrl = '/api/v1/jobs'

        test('get "/" returns 200', async () => {
          expect(authUser).toBeDefined()
          await supertest(app).get(baseUrl)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
            .expect(res => {
              expect(res.body.jobs).toHaveLength(0)
              expect(res.body.count).toBe(0)
              expect(res.body.pages).toBe(1)
            })
        })

        test('post with valid values returns 201', async () => {
          await supertest(app).post(baseUrl)
            .send({
              position: 'Software Engineer',
              company: 'Mozilla',
              location: 'San Francisco'
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
              location: 'San Francisco'
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

        test('patch returns forbidden if not job user', async () => {
          await registerOtherUser(app)
          const authOther = await loginUser(app, otherUser)
          const job = {
            contract: ContractType.fullTime,
            status: ApplicationStatus.pending,
            company: faker.company.name(),
            location: faker.address.city(),
            position: faker.word.noun(),
          }
          const {job: newJob} = await insertJob(app, authUser, job)
          const location = faker.address.city()
          const company = faker.company.name()
          await supertest(app).patch(`${baseUrl}/${newJob.id}`)
            .send({...job, company, location})
            .set('Authorization', `Bearer ${authOther.token}`)
            .expect(403)
            .then(res => {
              expect(res.body).toHaveProperty('error')
            })
        })

        test('patch returns 200 and returns updated job', async () => {
          const job = {
            contract: ContractType.fullTime,
            status: ApplicationStatus.pending,
            company: faker.company.name(),
            location: faker.address.city(),
            position: faker.word.noun(),
          }
          const {job: newJob} = await insertJob(app, authUser, job)
          const location = faker.address.city()
          const company = faker.company.name()
          await supertest(app).patch(`${baseUrl}/${newJob.id}`)
            .send({...job, company, location})
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
            .then(res => {
              expect(res.body).toHaveProperty('job')
              expect(res.body.job.company).toBe(company)
              expect(res.body.job.location).toBe(location)
            })
        })

        test('patch returns 401 when request not authorized', async () => {
          const job = {
            contract: ContractType.fullTime,
            status: ApplicationStatus.pending,
            company: faker.company.name(),
            location: faker.address.city(),
            position: faker.word.noun(),
          }
          const {job: newJob} = await insertJob(app, authUser, job)
          const location = faker.address.city()
          const company = faker.company.name()
          await supertest(app).patch(`${baseUrl}/${newJob.id}`)
            .send({...job, company, location})
            .expect(401)
            .then(res => expect(res.body).toHaveProperty('error'))
        })

        test('patch returns 404 when job doesn\'t exist', async () => {
          await supertest(app).patch(`${baseUrl}/${new mongoose.Types.ObjectId().toString()}`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .send({
              contract: ContractType.fullTime,
              status: ApplicationStatus.pending,
              company: faker.company.name(),
              location: faker.address.city(),
              position: faker.word.noun(),
            })
            .expect(403)
            .then(res => expect(res.body).toHaveProperty('error'))
        })
        test('delete returns 200 when authenticated', async () => {
          const {job} = await insertJob(app, authUser, {
            company: faker.company.name(),
            location: faker.address.cityName(),
            position: faker.hacker.adjective(),
            status: ApplicationStatus.pending,
            contract: ContractType.fullTime,
          })
          await supertest(app).delete(`${baseUrl}/${job.id}`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
          await supertest(app).get(`${baseUrl}`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
            .then(res => {
              expect(res.body.jobs).toBeDefined()
              expect(res.body.jobs.find((j: JobResponse) => j.id === job.id)).not.toBeDefined()
            })
        })

        test('delete returns 403 when not authorized', async () => {
          const otherAuthUser = await loginUser(app, otherUser)
          const {job} = await insertJob(app, authUser, {
            company: faker.company.name(),
            location: faker.address.cityName(),
            position: faker.hacker.adjective(),
            status: ApplicationStatus.pending,
            contract: ContractType.fullTime,
          })
          await supertest(app).delete(`${baseUrl}/${job.id}`)
            .set('Authorization', `Bearer ${otherAuthUser.token}`)
            .expect(403)
          await supertest(app).get(`${baseUrl}`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
            .then(res => {
              expect(res.body.jobs).toBeDefined()
              expect(res.body.jobs.find((j: JobResponse) => j.id === job.id)).toBeDefined()
            })
        })

        test('default stats returns when no jobs for user', async() => {
          await Job.deleteMany()
          await supertest(app).get(`${baseUrl}/stats`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
            .then(res => {
              const {stats} = res.body
              expect(Object.keys(stats)).toEqual(Object.values(ApplicationStatus))
              expect(Object.values(stats)).toEqual([0, 0, 0, 0])
            })
        })

        test('stats returns 200 when authenticated', async() => {
          await Job.deleteMany()
          const jobs = []
          for (let i = 0; i < 10; i++) {
            jobs.push(insertJob(app, authUser, generateJob()))
          }
          await Promise.all(jobs)
          await supertest(app).get(`${baseUrl}/stats`)
            .set('Authorization', `Bearer ${authUser.token}`)
            .expect(200)
        })

      })
    })
  })
})
