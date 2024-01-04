const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { server } = require('../index')
const Blog = require('../models/blog')

const listWithManyBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

const newBlogBody = {
  title: "Example blog",
  author: "Example Author",
  url: "https://www.exampleurl.com",
  likes: "69"
}

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = listWithManyBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())

  // Converts all promises returned by blog.save() into an unique promise
  // As all promises are proccessed in parallel, the order will be different with each execution
  await Promise.all(promiseArray)
})

describe('api tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(listWithManyBlogs.length)
  })

  test('id property of each blog is defined correctly', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
  
  test('blogs are created correctly', async() => {
    const postResponse = await api.post('/api/blogs').send(newBlogBody)

    expect(postResponse.status).toBe(200)

    const getResponse = await api.get('/api/blogs')

    expect(getResponse.body).toHaveLength(listWithManyBlogs.length + 1)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})