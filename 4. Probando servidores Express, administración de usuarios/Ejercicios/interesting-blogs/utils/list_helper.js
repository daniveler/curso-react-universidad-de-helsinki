const logger = require('./logger')

const totalLikes = (blogs) => {
  let likesCount = 0

  if (!blogs) {
    return 0
  }
  
  blogs.forEach(blog => {
    likesCount += blog.likes 
  })

  return likesCount
}

const favoriteBlog = (blogs) => {
  if (!blogs) {
    return 0
  }

  // Get an array of all likes
  let likesList = blogs.map(blog => blog.likes)

  console.log(likesList)

  // Return the blog which has the maximum likes
  return blogs.find(blog => blog.likes === Math.max(...likesList))
} 

module.exports = {
  totalLikes,
  favoriteBlog
}