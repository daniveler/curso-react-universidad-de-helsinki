import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import loginService from './services/login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    blogsService.getAll().then(blogs =>
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
        toast.error('Wrong credentials')
      } 
      else {
        toast.success('Login succeded!')
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        setUsername('')
        setPassword('')
      } 
    }
    catch (exception) {
      toast.error('Login failed: Wrong username or password')
      console.log(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    localStorage.removeItem('user')
    toast.info('User logged out')
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    blogsService.createNewBlog(newBlog, user.token)

    toast.success('New blog created!')
  } 

  const loginForm = () => (
    <div>
      <h2>Log in to see your Blogs</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>Password: </label>
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

  const createNewBlog = () => (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          <label>Title: </label>
          <input 
            type='text'
            value={newBlogTitle}
            name='Title'
            required
            onChange={({ target }) => setNewBlogTitle(target.value)}
            />
          <label>Author: </label>
          <input 
            type='text'
            value={newBlogAuthor}
            name='Author'
            required
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          <label>Url: </label>
          <input 
            type='url'
            value={newBlogUrl}
            name='Url'
            required
            onChange={({ target }) => setNewBlogUrl(target.value)}
            />
        </div>
        <div>
          <button type='submit'>Create Blog</button>
        </div>
      </form>
    </div>
  ) 

  return (
    <div>
      <h1>Interesting Blogs</h1>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition: Bounce
        />
      { 
        !user ? loginForm() 
          : 
            <>
              <div>
                <p>{user.name} logged in</p>
                <button onClick={handleLogout}>Log Out</button>
              </div>
              <div>
                { blogsList(blogs) } 
              </div>
              <div>
                { createNewBlog() } 
              </div>
            </>
      }
    </div>
  )
}

export default App