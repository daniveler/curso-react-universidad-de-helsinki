const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
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

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  } 
  catch(error) {
    next(error)
  }
})

module.exports = blogsRouter