import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/name/'

const params = {
  fullText: true
}

const getCountryByName = async (name) => {
  const response = await axios.get(baseUrl + name, { params })
  return response.data[0]
}

export default { getCountryByName }