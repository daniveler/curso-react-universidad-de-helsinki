import React, { useState } from 'react'
import Person from './Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: 666666666, id: 1 },
    { name: 'Paco Hellas', phone: 401234568, id: 2 },
    { name: 'Ada Lovelace', phone: 394453235, id: 3 },
    { name: 'Dan Abramov', phone: 432343476, id: 4 },
    { name: 'Mary Poppendieck', phone: 236423122, id: 5 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const filterResult = filteredPersons.length !== 0
    ? filteredPersons
    : persons

  const addFilter = (event) => {
    event.preventDefault()
    setPersons(filterResult)
  }

  const clearFilter = (event) => {
    event.preventDefault()
    setNewFilter('')
    setPersons(filterResult)
  }

  const addName = (event) => {
    event.preventDefault()
    const phoneObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1
    }

    if (!phoneObject.name || !phoneObject.name.trim().length) {
      alert("Person's name can not be empty")
    }
    else if (filterResult.some(person => person.name === phoneObject.name)) {
      alert(phoneObject.name + " alredy exists in the phonebook")
    }
    else {
      setPersons(filterResult.concat(phoneObject))
      setNewName('')
      setNewPhone('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addFilter}>
        <div>Search contacts: 
          <input value={newFilter} onChange={handleFilterChange} />
          <button type="submit">filter</button>
          <div>
            <button type="submit" onClick={clearFilter}>
              clear filter
            </button>
          </div>
        </div>
        <br/><br/>
      </form>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> 
          phone: <input type="tel" value={newPhone} onChange={handlePhoneChange} pattern="[0-9]{3}[0-9]{3}[0-9]{3}" />
          <small>Format: 123456789</small>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          <tr>
          <th>Name</th>
          <th>Phone Number</th>
        </tr>
        {persons.map(person =>
          <Person name={person.name} phone={person.phone} />
        )}
        </tbody>
      </table>
    </div>
  )
}

export default App