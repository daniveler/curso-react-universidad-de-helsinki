const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  // If the body is not valid
  // if (!blog.title || !blog.author || !blog.url || !blog.likes) {
  //   response.status(400).json({ error: 'Incorrect body' })
  // }
  // else {
    blog.save().then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.log('Could not create new blog'))
  })
  // }

module.exports = blogsRouter