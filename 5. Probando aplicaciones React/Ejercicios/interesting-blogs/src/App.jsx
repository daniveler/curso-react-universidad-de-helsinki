import { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import CreateNewBlog from './components/CreateNewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [updateBlogsTrigger, setUpdateBlogsTrigger] = useState(false)

  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    setUser(JSON.parse(localStorage.getItem('user')))
  }, [updateBlogsTrigger])

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

    await blogsService.createNewBlog(newBlog, user.token)
    setUpdateBlogsTrigger(prev => !prev)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    toast.success('New blog created!')
  } 

  const handleDelete = async(blog, token) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title} from blogs list?`)) {
      
      try {
        await blogsService.deleteBlog(blog.id, token)
      }
      catch(error) {
        if(error.response.status == 403) {
          toast.error('Actual user does not have permission to delete this blog')
        }

        return
      }
      setUpdateBlogsTrigger(prev => !prev)
      toast.success(`Blog ${blog.title} has been succesfully deleted`)
    }
  }

  return (
    <div>
      <h1>Interesting Blogs</h1>
      { 
        !user 
          ? 
            <LoginForm 
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
                <button id="logoutButton" onClick={handleLogout}>Log Out</button>
              </div>
              <div>
                <BlogsList 
                  blogs={blogs} 
                  user={user}
                  handleDelete={handleDelete}
                /> 
              </div>
              <div>
                <Togglable mainButtonId='create-blog-togglable' buttonLabel='Create New Blog'>
                  <CreateNewBlog 
                    newBlogTitle={newBlogTitle}
                    newBlogAuthor={newBlogAuthor}
                    newBlogUrl={newBlogUrl}
                    handleNewBlogTitleChange={({ target }) => setNewBlogTitle(target.value)}
                    handleNewBlogAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
                    handleNewBlogUrlChange={({ target }) => setNewBlogUrl(target.value)}
                    handleCreateNewBlog={handleCreateNewBlog}
                  />
                </Togglable>
                
              </div>
            </>
      }
      <ToastContainer
        id='toast-container'
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
        // transition="Bounce"
        />
    </div>
  )
}

export default App