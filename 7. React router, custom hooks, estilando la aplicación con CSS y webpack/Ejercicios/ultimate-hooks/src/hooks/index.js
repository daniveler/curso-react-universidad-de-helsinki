import axios from 'axios'
import { useEffect, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  let token = null

  const setToken = newToken => {
  token = `bearer ${newToken}`
}

  useEffect(() => {
    const request = axios.get(baseUrl)
    request.then(response => setResources(response.data))
  }, [setResources])

  const create = async(resource) => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, resource, config)
    setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

// export default {
//   useField,
//   useResource
// }