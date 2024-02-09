const CreateNewBlog = (props) => (
  <div>
    <h2>Create new Blog</h2>
    <form id="createBlogForm" onSubmit={props.handleCreateNewBlog}>
      <div>
        <label>Title: </label>
        <input 
          id="title"
          type='text'
          value={props.newBlogTitle}
          name='Title'
          required
          onChange={props.handleNewBlogTitleChange}
          />
        <label>Author: </label>
        <input 
          id="author"
          type='text'
          value={props.newBlogAuthor}
          name='Author'
          required
          onChange={props.handleNewBlogAuthorChange}
          />
        <label>Url: </label>
        <input 
          id="url"
          type='url'
          value={props.newBlogUrl}
          name='Url'
          required
          onChange={props.handleNewBlogUrlChange}
          />
      </div>
      <div>
        <button id='create-blog-button' type='submit'>Create Blog</button>
      </div>
    </form>
  </div>
) 

export default CreateNewBlog