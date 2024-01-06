const mongoose = require('mongoose')
const { server } = require('../index')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')
const User = require('../models/user') 

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcryptjs.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('success requests', () => {
  test('get request for only one user', async () => {
    const users = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(users.body[0].username).toBe('root')
  })

  test('post request for a new valid user', async () => {
    const usersAtStart = await helper.usersInDb()


    await api
      .post('/api/users').send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(helper.newUser.username)
  })
})

describe('when the user is invalid, returns 400 if', () => { 
  test('too short username', async() => {
    const usersAtStart = await helper.usersInDb()


    await api.post('/api/users')
      .send(helper.newUserWrongUserName)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('not unique username', async() => {
    const usersAtStart = await helper.usersInDb()

    await api.post('/api/users')
      .send(helper.newUserNotUnique)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('too short password', async() => {
    const usersAtStart = await helper.usersInDb()

    await api.post('/api/users')
      .send(helper.newUserWrongPass)
      .expect(400)
    
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
    server.close()
    mongoose.connection.close()
})