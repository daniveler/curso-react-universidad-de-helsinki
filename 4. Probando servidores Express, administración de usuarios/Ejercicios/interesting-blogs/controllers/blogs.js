const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  } 
  catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  const updatedBody = request.body

  try {
    if(!updatedBody || !updatedBody.title || !updatedBody.url) {
      response.status(400)
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBody, { new: true })
    response.json(updatedBlog)
  }
  catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async(request, response, next) => {
  const idToDelete = request.params.id

  try {
    const deletedBlog = await Blog.findByIdAndDelete(idToDelete)
    response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

module.exports = blogsRouter