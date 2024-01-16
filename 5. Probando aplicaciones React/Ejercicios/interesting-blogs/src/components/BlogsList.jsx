import Blog from './Blog' 

const BlogsList = (props) => {
  
  return (
    <>
      <h2>Blogs List</h2>

      <div>
        {props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
    
  )
}
  

export default BlogsList