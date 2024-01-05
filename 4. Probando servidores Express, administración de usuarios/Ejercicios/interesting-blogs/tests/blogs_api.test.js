const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { server } = require('../index')
const Blog = require('../models/blog')
const blog = require('../models/blog')

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

const newBlogWithNoLikesBody = {
  title: "No Likes Example blog",
  author: "No Likes Example Author",
  url: "https://www.nolikesexampleurl.com"
}

const incorrectBody = {
  author: "No Likes Example Author"
}

const invalidBody = {
  invalidProperty: "example"
}

const updatedBody = {
  title: "New React patterns",
  author: "Michael Chan",
  url: "https://newreactpatterns.com/",
  likes: 200,
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

describe('GET requests', () => {
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
})

describe('POST requests', () => {
  test('when a blog is created it is correctly saved in database', async() => {
    const postResponse = await api.post('/api/blogs').send(newBlogBody)

    expect(postResponse.status).toBe(200)

    const getResponse = await api.get('/api/blogs')

    expect(getResponse.body).toHaveLength(listWithManyBlogs.length + 1)
  })

  test('when the property likes is not sent body, the blog has 0 likes by default', async() => {
    const postResponse = await api.post('/api/blogs').send(newBlogWithNoLikesBody)

    expect(postResponse.status).toBe(200)

    const getResponse = await api.get('/api/blogs')

    let blogWithNoLikes = getResponse.body.find(blog => blog.title === newBlogWithNoLikesBody.title)

    expect(blogWithNoLikes.likes).toBe(0)
  })

  test('when title or url are not sent in the body, it returns 400 Bad Request', async() => {
    const postResponse = await api.post('/api/blogs').send(incorrectBody)

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

    expect(getSecondResponse.body).toHaveLength(listWithManyBlogs.length - 1)
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
      .send(invalidBody)

    expect(putResponse.status).toBe(400)
  })

  test('when the body is valid the blog is updated', async() => {
    const getResponse = await api.get('/api/blogs')

    const blogToUpdate = getResponse.body.find(blog => blog.title === 'React patterns')
    
    const putResponse = await api
      .put('/api/blogs/' + blogToUpdate.id)
      .send(updatedBody)

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