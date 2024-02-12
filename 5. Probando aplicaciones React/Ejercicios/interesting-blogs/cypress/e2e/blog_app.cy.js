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

const loginCorrectUser = () => {
  cy.get('#username').type(testUser.username)
  cy.get('#password').type(testUser.password)
  cy.get('#login-button').click()
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
      loginCorrectUser()
  
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
     loginCorrectUser()
    })

    it('a new blog can be created', () => {
      cy.get('#create-blog-togglable').click()
      
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://www.testurl.com')

      cy.get('#create-blog-button').click()
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
  })

})