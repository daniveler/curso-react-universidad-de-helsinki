import axios from 'axios'


const baseUrl = 'http://localhost:3001/api'

const getAllPersons = () => {
  const request = axios.get(`${baseUrl}/persons`)
  return request.then(response => response.data)
}

const createPerson = (person) => {
  const request = axios.post(`${baseUrl}/persons`, person)
  return request.then(response => response.data)
}

const updatePerson = (id, person) => {
  const request = axios.put(`${baseUrl}/persons/${id}`, person)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/persons/${id}`)
  return request.then()
}

export default { 
  getAllPersons, 
  createPerson, 
  updatePerson, 
  deletePerson 
}
