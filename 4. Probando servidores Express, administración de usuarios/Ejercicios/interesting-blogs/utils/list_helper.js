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

  // Return the blog which has the maximum likes
  return blogs.find(blog => blog.likes === Math.max(...likesList))
} 

const mostBlogs = (blogs) => {
  if (!blogs) {
    return 0
  }

  let authorList = []
  
  blogs.forEach(blog => {
    // Search the index of the author in the author list
    let index = authorList.findIndex(author => author.author === blog.author)

    // If it's found, we increment his number of blogs
    if (index !== -1) {
      authorList[index].blogs++
    }
    // If not, we add it as a new author
    else {
      authorList.push({ author: blog.author, blogs: 1 })
    }
  })

  // Get an array of all blogs
  let blogsNumList = authorList.map(author => author.blogs)

  // Return the author which has the maximum blogs
  return authorList.find(author => author.blogs === Math.max(...blogsNumList))
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}