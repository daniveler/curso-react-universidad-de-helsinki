import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (blog, likes) => {
    const updatedBody = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }

    setLikes(likes + 1)

    blogService.updateBlog(blog.id, updatedBody)
  }
  
  return (
    <>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>Show details</button>
      </div>  
      <div style={showWhenVisible}>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {likes}
          <button onClick={() => { handleLike(blog, likes) }}>Like ♥️</button>
        </div>
        <button onClick={toggleVisibility}>Hide details</button>
      </div>
    </>
  )
}

  

export default Blog