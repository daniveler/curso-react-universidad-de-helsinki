import Blog from './Blog' 

const BlogsList = (props) => (
  props.blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )
)

export default BlogsList