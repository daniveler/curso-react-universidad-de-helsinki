import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      if (!user) {
        alert('Wrong credentials')
      } 
      else {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        setUsername('')
        setPassword('')
      } 
    }
    catch (exception) {
      alert('Wrong credentials')
      console.log(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    localStorage.removeItem('user')
  }

  const loginForm = () => (
    <div>
      <h2>Log in to see your Blogs</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  )

  const blogsList = (blogs) => (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
  )

  return (
    <div>
      <h1>Interesting Blogs</h1>
      { 
        !user ? loginForm() 
          : 
            <>
              <div>
                <p>{user.name} logged in</p>
                <button onClick={handleLogout}>Log Out</button>
              </div>
              <br></br>
              <div>
                { blogsList(blogs) } 
              </div>
            </>
      }
    </div>
  )
}

export default App