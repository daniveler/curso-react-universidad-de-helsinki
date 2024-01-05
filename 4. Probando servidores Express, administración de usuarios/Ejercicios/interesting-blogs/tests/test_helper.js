const User = require('../models/user')

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
  

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  listWithManyBlogs,
  newBlogBody,
  newBlogWithNoLikesBody,
  incorrectBody,
  invalidBody,
  updatedBody,
  usersInDb,
}