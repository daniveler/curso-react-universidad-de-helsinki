const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body
  const token = request.token

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  
  let decodedToken = ''

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }  
  catch(error) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user

  if (!user) {
    response.status(400).json({ error: 'invalid userId'})
  } 
  else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })
  
    try {
      const savedBlog = await blog.save()
      
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      
      response.json(savedBlog)
    } 
    catch(error) {
      next(error)
    }
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
  const token = request.token

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  
  let decodedToken = ''

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  catch(error) {
    response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user

  if (!user) {
    response.status(400).json({ error: 'invalid userId'})
  }

  try {
    const idToDelete = request.params.id

    const blogToDelete = await Blog.findById(idToDelete)

    if (blogToDelete.user._id.toString() !== decodedToken.id) {
      response.status(403).json({ error: 'logged user has no permission to delete the blog' })
    }
    else {
      await Blog.findByIdAndDelete(idToDelete)
      response.status(204).end()
    }

  }
  catch(error) {
    response.status(404).json({ error: 'the blog with provided id does not exist' })
  }
})

module.exports = blogsRouter