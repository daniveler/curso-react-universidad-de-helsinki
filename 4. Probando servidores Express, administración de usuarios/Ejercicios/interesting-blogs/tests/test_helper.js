const User = require('../models/user')

const listWithManyBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      userId: "6599663fbf7ca90c67e75517"
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      userId: "6599663fbf7ca90c67e75517"
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      userId: "6599663fbf7ca90c67e75517"
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      userId: "6599663fbf7ca90c67e75517"
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      userId: "6599663fbf7ca90c67e75517"
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      userId: "6599663fbf7ca90c67e75517"
    }  
  ]
  
  const newBlogBody = {
    title: "Example blog",
    author: "Example Author",
    url: "https://www.exampleurl.com",
    likes: "69",
    userId: "6599663fbf7ca90c67e75517"
  }
  
  const newBlogWithNoLikesBody = {
    title: "No Likes Example blog",
    author: "No Likes Example Author",
    url: "https://www.nolikesexampleurl.com",
    userId: "6599663fbf7ca90c67e75517"
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
    userId: "6599663fbf7ca90c67e75517"
  }

  const newUser = {
    username: '"daniveler"',
    name: 'Daniel Velerdas',
    password: 'examplepassword',
  }

  const newUserNotUnique = {
    username: 'root',
    name: 'Rootencio',
    password: 'examplepassword',
  } 


  const newUserWrongUserName = {
    username: 'da',
    name: 'Daniel Velerdas',
    password: 'examplepassword',
  }
    
  const newUserWrongPass = {
    username: '"daniveler"',
    name: 'Daniel Velerdas',
    password: 'ex',
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
  newUser,
  newUserNotUnique,
  newUserWrongUserName,
  newUserWrongPass,
  usersInDb,
}