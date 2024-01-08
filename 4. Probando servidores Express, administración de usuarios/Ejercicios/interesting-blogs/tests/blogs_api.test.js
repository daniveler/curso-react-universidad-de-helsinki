const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { server } = require('../index')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.listWithManyBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())

  // Converts all promises returned by blog.save() into an unique promise
  // As all promises are proccessed in parallel, the order will be different with each execution
  await Promise.all(promiseArray)

  await User.deleteMany({})

  const passwordHash = await bcryptjs.hash('examplepassword', 10)
  const user = new User({ username: 'daniveler', passwordHash })

  await user.save()
})

describe('GET requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
  })

  test('id property of each blog is defined correctly', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST requests', () => {
  test('when the authorization header is not sent, returns 401', async() => {
    const postResponse = await api.post('/api/blogs')
      .send(helper.newBlogBody)

    expect(postResponse.status).toBe(401)
  })

  test('when the token sent is invalid, returns 401', async() => {
    const postResponse = await api.post('/api/blogs')
      .set('authorization', 'Bearer ' + "invalidToken")
      .send(helper.newBlogBody)

    expect(postResponse.status).toBe(401)
  })
  test('when a blog is created it is correctly saved in database', async() => {
    const postLoginResponse = await api.post('/api/login')
      .send(helper.loginSuccess)

    const postResponse = await api.post('/api/blogs')
      .set('authorization', 'Bearer ' + postLoginResponse.body.token)
      .send(helper.newBlogBody)

    expect(postResponse.status).toBe(200)

    const getResponse = await api.get('/api/blogs')

    expect(getResponse.body).toHaveLength(helper.listWithManyBlogs.length + 1)
  })

  test('when the property likes is not sent body, the blog has 0 likes by default', async() => {
    const postLoginResponse = await api.post('/api/login')
      .send(helper.loginSuccess)

    const postResponse = await api.post('/api/blogs')
      .set('authorization', 'Bearer ' + postLoginResponse.body.token)
      .send(helper.newBlogWithNoLikesBody)

    expect(postResponse.status).toBe(200)

    const getResponse = await api.get('/api/blogs')

    let blogWithNoLikes = getResponse.body.find(blog => blog.title === helper.newBlogWithNoLikesBody.title)

    expect(blogWithNoLikes.likes).toBe(0)
  })

  test('when title, url or userId are not sent in the body, it returns 400 Bad Request', async() => {
    const postLoginResponse = await api.post('/api/login')
    .send(helper.loginSuccess)

  const postResponse = await api.post('/api/blogs')
    .set('authorization', 'Bearer ' + postLoginResponse.body.token)
    .send(helper.incorrectBody)

    expect(postResponse.status).toBe(400)
  })
})

describe('DELETE requests', () => {
  test('when the id is not specified, it returns 404 Not Found', async() => {
    const response = await api.delete('/api/blogs')

    expect(response.status).toBe(404)
  })

  test('when the id does not exists on the database, it returns 404 Not Found', async() => {
    const response = await api.delete('/api/blogs', '1234')

    expect(response.status).toBe(404)
  })

  test('when the id exists, the blog is deleted correctly', async() => {
    const getResponse = await api.get('/api/blogs')

    const blogToDelete = getResponse.body.find(blog => blog.title === 'React patterns')
    
    const deleteResponse = await api.delete('/api/blogs/' + blogToDelete.id)

    expect(deleteResponse.status).toBe(204)

    const getSecondResponse = await api.get('/api/blogs')

    expect(getSecondResponse.body).toHaveLength(helper.listWithManyBlogs.length - 1)
  })
})

describe('PUT requests', () => {
  test('when the body is empty, it returns 400', async() => {
    const getResponse = await api.get('/api/blogs')

    const blogToUpdate = getResponse.body.find(blog => blog.title === 'React patterns')
    
    const putResponse = await api
      .put('/api/blogs/' + blogToUpdate.id)
      .send('')

    expect(putResponse.status).toBe(400)
  })

  test('when the body is invalid, it returns 400', async() => {
    const getResponse = await api.get('/api/blogs')

    const blogToUpdate = getResponse.body.find(blog => blog.title === 'React patterns')
    
    const putResponse = await api
      .put('/api/blogs/' + blogToUpdate.id)
      .send(helper.invalidBody)

    expect(putResponse.status).toBe(400)
  })

  test('when the body is valid the blog is updated', async() => {
    const getResponse = await api.get('/api/blogs')

    const blogToUpdate = getResponse.body.find(blog => blog.title === 'React patterns')
    
    const putResponse = await api
      .put('/api/blogs/' + blogToUpdate.id)
      .send(helper.updatedBody)

    expect(putResponse.status).toBe(200)

    const secondGetResponse = await api.get('/api/blogs')

    const blogUpdated = secondGetResponse.body.find(blog => blog.id === blogToUpdate.id)

    expect(blogUpdated).toEqual({
      id: blogToUpdate.id,
      title: "New React patterns",
      author: "Michael Chan",
      url: "https://newreactpatterns.com/",
      likes: 200,
    })
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})