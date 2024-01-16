const CreateNewBlog = (props) => (
  <div>
    <h2>Create new Blog</h2>
    <form onSubmit={props.handleCreateNewBlog}>
      <div>
        <label>Title: </label>
        <input 
          type='text'
          value={props.newBlogTitle}
          name='Title'
          required
          onChange={props.handleNewBlogTitleChange}
          />
        <label>Author: </label>
        <input 
          type='text'
          value={props.newBlogAuthor}
          name='Author'
          required
          onChange={props.handleNewBlogAuthorChange}
          />
        <label>Url: </label>
        <input 
          type='url'
          value={props.newBlogUrl}
          name='Url'
          required
          onChange={props.handleNewBlogUrlChange}
          />
      </div>
      <div>
        <button type='submit'>Create Blog</button>
      </div>
    </form>
  </div>
) 

export default CreateNewBlog