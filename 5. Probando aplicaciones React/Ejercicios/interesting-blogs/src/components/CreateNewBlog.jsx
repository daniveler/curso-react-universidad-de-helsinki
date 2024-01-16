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
          onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        <label>Author: </label>
        <input 
          type='text'
          value={props.newBlogAuthor}
          name='Author'
          required
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        <label>Url: </label>
        <input 
          type='url'
          value={props.newBlogUrl}
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

export default CreateNewBlog