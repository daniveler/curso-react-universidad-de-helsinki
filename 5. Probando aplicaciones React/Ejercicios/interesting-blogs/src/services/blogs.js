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

export default { 
  getAll, 
  createNewBlog
}