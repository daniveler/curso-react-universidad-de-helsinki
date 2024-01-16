import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createNewBlog = async (newBlog, token) => {
  const config = { headers: { authorization: `Bearer ${token}` }}

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const updateBlog = async (id, updatedBlog) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return request.data
}

const deleteBlog = async (id, token) => {
  const config = { headers: { authorization: `Bearer ${token}` }}

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { 
  getAll, 
  createNewBlog,
  updateBlog,
  deleteBlog
}