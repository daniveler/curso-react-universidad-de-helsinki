const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcryptjs.hash('examplepassword', 10)
  const user = new User({ username: 'daniveler', passwordHash })

  await user.save()
})

describe('login with username and password', () => {
  test('when there is no request body', async() => {
    await api
      .post('/api/login')
      .send()
      .expect(401)
  })

  test('when the request body is invalid', async() => {
    await api
      .post('/api/login')
      .send(helper.invalidBody)
      .expect(401)
  })

  test('when username is not valid', async() => {
    await api
      .post('/api/login')
      .send(helper.loginWrongUser)
      .expect(401)
  })

  test('when password is not valid', async() => {
    await api
      .post('/api/login')
      .send(helper.loginWrongPass)
      .expect(401)
  })

  test('when login is success', async() => {
    const response = await api
      .post('/api/login')
      .send(helper.loginSuccess)
      .expect(200)

    expect(response.body.token).toBeDefined()
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})