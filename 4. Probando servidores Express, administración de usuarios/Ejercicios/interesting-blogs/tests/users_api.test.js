const mongoose = require('mongoose')
const { server } = require('../index')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')
const User = require('../models/user') 

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('get request returns the user correctly', async () => {
    const users = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(users.body[0].username).toBe('root')
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'daniveler',
      name: 'Daniel Velerdas',
      password: 'examplepassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
    server.close()
    mongoose.connection.close()
})