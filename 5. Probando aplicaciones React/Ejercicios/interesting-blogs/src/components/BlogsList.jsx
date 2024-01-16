import Blog from './Blog' 

const BlogsList = (props) => {
  const orderedBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>Blogs List</h2>
      <div>
        {orderedBlogs(props.blogs).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
    
  )
}
  

export default BlogsList