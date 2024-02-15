import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const inputProps = {
    type: type,
    value: value,
    onChange: handleChange
  }

  return inputProps
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}