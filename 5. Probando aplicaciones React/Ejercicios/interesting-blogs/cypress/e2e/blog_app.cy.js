describe('Interesting Blogs App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('main page is loaded', () => {
    cy.contains('Interesting Blogs')
  })

  it('login page can is opened at first', () => {
    cy.contains('Log in to see your Blogs')
  })

  it('user can log in', () => {
    cy.get('#username').type('daniveler')
    cy.get('#password').type('examplepassword')
    cy.get('#login-button').click()

    cy.contains('Daniel Velerdas logged in')
  })
})