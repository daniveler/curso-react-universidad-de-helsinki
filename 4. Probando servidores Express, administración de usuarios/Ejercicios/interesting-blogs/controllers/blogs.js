const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

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