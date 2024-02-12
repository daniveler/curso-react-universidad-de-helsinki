const backendBaseUrl = 'http://localhost:3003'

const testUser = {
  name: 'Daniel Velerdas',
  username: 'daniveler',
  password: 'examplepassword'
}

const otherUser = {
  name: 'Other User',
  username: 'otheruser',
  password: 'examplepassword'
}

const defaultBlog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'https://www.testurl.com'
}

const mostLikesBlog = {
  title: 'Most Liked Blog',
  author: 'Most Liked Author',
  url: 'https://www.mostliked.com'
}

const loginAsUser = (user) => {
  cy.get('#username').type(user.username)
  cy.get('#password').type(user.password)
  cy.get('#login-button').click()
}

const createNewBlog = (blog) => {      
  cy.get('#title').type(blog.title)
  cy.get('#author').type(blog.author)
  cy.get('#url').type(blog.url)

  cy.get('#create-blog-button').click()

  cy.get('.blog').should('exist')
}

const giveLikesToBlog = (blogIndex, likesNumber) => {
  cy.get('.showDetailsButton').eq(blogIndex).click()

  for(let i = 0; i < likesNumber; i++) {
    cy.get('.likeButton').eq(blogIndex).click()
  }
}

describe('Interesting Blogs App', () => {
  before(() => {
    cy.request('POST', `${backendBaseUrl}/api/testing/reset`)
    cy.request('POST', `${backendBaseUrl}/api/users`, testUser)
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('main page is loaded', () => {
    cy.contains('Interesting Blogs')
  })

  describe('Login: ', () => {
    it('login page can is opened at first', () => {
      cy.contains('Log in to see your Blogs')
    })
  
    it('correct user can log in', () => {
      loginAsUser(testUser)
  
      cy.contains('Daniel Velerdas logged in')
    })
  
    it('incorrect user can\'t log in', () => {
      cy.get('#username').type('invalid-user')
      cy.get('#password').type('invalid-pass')
      cy.get('#login-button').click()
    })
  })

  describe('When logged in: ', () => {
    beforeEach(() => {
     loginAsUser(testUser)
    })

    it('a new blog can be created', () => {
      cy.get('#create-blog-togglable').click()
      createNewBlog(defaultBlog)
    })

    it('a blog can be liked', () => {
      cy.get('.showDetailsButton').click()
      cy.get('.likesNumber').then($likes => {
        const initialLikes = parseInt($likes.text())

        cy.get('.likeButton').click()
        cy.get('.likesNumber').should('have.text', (initialLikes + 1).toString())
      })
    })

    it('a blog can be deleted by the user which created it', () => {
      cy.get('.showDetailsButton').click()
      cy.get('.deleteButton').click()
    })

    it('when there are multiple blogs, they are sort by likes number', () => {
      cy.get('#create-blog-togglable').click()

      for(let i = 0; i < 3; i++) {
        createNewBlog(defaultBlog)
        cy.wait(500)
      }  

      createNewBlog(mostLikesBlog)
      cy.wait(500)

      giveLikesToBlog(1, 5)
      giveLikesToBlog(2, 7)
      giveLikesToBlog(3, 25)

      cy.reload()

      cy.get('.blog').eq(0).should('contain', 'Most Liked Blog')
    })
  })

  describe('When logged in as different user: ', () => {
    before(() => {
      cy.request('POST', `${backendBaseUrl}/api/testing/reset`)
      cy.request('POST', `${backendBaseUrl}/api/users`, testUser)
      cy.request('POST', `${backendBaseUrl}/api/users`, otherUser)
    })

    it('a user can not delete blogs which were not created by him', () => {
      loginAsUser(testUser)

      cy.get('#create-blog-togglable').click()
      createNewBlog(defaultBlog)

      cy.get('#logoutButton').click()
      
      loginAsUser(otherUser)

      cy.get('.showDetailsButton').click()
      cy.get('.deleteButton').click()

      cy.get('.blog').should('exist')
    })
  })

})