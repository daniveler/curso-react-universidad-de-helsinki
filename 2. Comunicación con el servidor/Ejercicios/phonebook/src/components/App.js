import React, { useEffect, useState } from 'react'
import Person from './Person'
import personsService from '../services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('Dani')
  const [newPhone, setNewPhone] = useState('666666666')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService.getAllPersons()
      .then(response => {
        setPersons(response)
        setFilteredPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filterPersons = (persons, filter) => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const addFilter = (event) => {
    event.preventDefault()

    const temp = filterPersons(persons, newFilter)

    if (temp.length !== 0 ) {
      setFilteredPersons(filterPersons(persons, newFilter))
    }
    else {
      alert('No numbers matching this filters. Please, try again or clear filters to show again the whole list.')
    }
  }

  const clearFilter = (event) => {
    event.preventDefault()
    setNewFilter('')
    setFilteredPersons(persons)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1
    }

    if (!personObject.name || !personObject.name.trim().length) {
      alert("Person's name can not be empty")
    }
    else if (!personObject.phone || !personObject.phone.trim().length) {
      alert("Person's phone can not be empty")
    }
    else if (persons.some(person => person.name === personObject.name)) {
      alert(personObject.name + " alredy exists in the phonebook")
    }
    else {
      setNewName('')
      setNewPhone('')
      setPersons(persons.concat(personObject))
      setFilteredPersons(persons.concat(personObject))
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
        {filteredPersons.map(person =>
          <Person name={person.name} phone={person.phone} />
        )}
        </tbody>
      </table>
    </div>
  )
}

export default App