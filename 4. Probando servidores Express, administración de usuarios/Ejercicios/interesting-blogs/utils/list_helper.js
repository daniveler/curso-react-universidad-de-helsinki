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

module.exports = {
  totalLikes
}