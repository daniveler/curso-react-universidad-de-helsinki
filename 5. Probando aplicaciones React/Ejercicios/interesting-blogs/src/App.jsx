import { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import CreateNewBlog from './components/CreateNewBlog'

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
        toast.error('Login failed: Wrong username or password')
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

  return (
    <div>
      <h1>Interesting Blogs</h1>
      { 
        !user 
          ? <LoginForm 
              username={username}
              password={password}
              handleLogin={handleLogin}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
          : 
            <>
              <div>
                <p>{user.name} logged in</p>
                <button onClick={handleLogout}>Log Out</button>
              </div>
              <div>
                <BlogsList blogs={blogs} /> 
              </div>
              <div>
                <CreateNewBlog 
                  newBlogTitle={newBlogTitle}
                  newBlogAuthor={newBlogAuthor}
                  newBlogUrl={newBlogUrl}
                  handleCreateNewBlog={handleCreateNewBlog}
                />
              </div>
            </>
      }
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
    </div>
  )
}

export default App