import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(props.blog.likes)

  const hideWhenVisible = { ...blogStyle, display: visible ? 'none' : '' }
  const showWhenVisible = { ...blogStyle, display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async(blog, likes) => {
    const updatedBody = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }

    setLikes(likes + 1)

    await blogsService.updateBlog(blog.id, updatedBody)
  }
  
  return (
    <>
      <div style={hideWhenVisible}>
        {props.blog.title} {props.blog.author}
        <button onClick={toggleVisibility}>Show details</button>
      </div>  
      <div style={showWhenVisible}>
        <div>
          {props.blog.title}
          <button onClick={toggleVisibility}>Hide details</button>
        </div>
        <div>{props.blog.author}</div>
        <div>{props.blog.url}</div>
        <div>
          {likes}
          <button onClick={() => handleLike(props.blog, likes)}>Like ♥️</button>
        </div>
        <div>
          <button onClick={() => props.handleDelete(props.blog, props.user.token) }>Delete</button>
        </div>
      </div>
    </>
  )
}

  

export default Blog