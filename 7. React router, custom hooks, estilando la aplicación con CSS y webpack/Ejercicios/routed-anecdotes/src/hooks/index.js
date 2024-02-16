import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleReset = (event) => {
    setValue('')
  }

  return {
    type: type,
    value: value,
    onChange: handleChange,
    onReset: handleReset
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}