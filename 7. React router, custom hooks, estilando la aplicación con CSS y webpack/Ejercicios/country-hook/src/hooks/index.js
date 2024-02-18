import { useState, useEffect } from 'react' 
import countriesService from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type: type,
    value: value,
    onChange: handleChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(name)

  console.log("Name in hook: " + name)

  useEffect(() => {
    countriesService.
      getCountryByName(name)
      .then(response => {
        setCountry(response)
      })
      .catch(error => {
        console.log(error)
        setCountry()
      })
    }, [name])

    return country
}