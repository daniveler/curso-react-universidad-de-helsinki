const backendBaseUrl = 'http://localhost:3003'

const testUser = {
  name: 'Daniel Velerdas',
  username: 'daniveler',
  password: 'examplepassword'
}

describe('Interesting Blogs App', () => {
  beforeEach(() => {
    cy.request('POST', `${backendBaseUrl}/api/testing/reset`)
    
    cy.request('POST', `${backendBaseUrl}/api/users`, testUser)
    cy.visit('http://localhost:3000')
  })

  it('main page is loaded', () => {
    cy.contains('Interesting Blogs')
  })

  it('login page can is opened at first', () => {
    cy.contains('Log in to see your Blogs')
  })

  it('user can log in', () => {
    cy.get('#username').type(testUser.username)
    cy.get('#password').type(testUser.password)
    cy.get('#login-button').click()

    cy.contains('Daniel Velerdas logged in')
  })
})