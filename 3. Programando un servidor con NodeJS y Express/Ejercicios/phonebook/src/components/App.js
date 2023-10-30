import React, { useEffect, useState } from 'react'
import Person from './Person'
import personsService from '../services/persons'
import '../styles/App.css'

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
      .catch(error => {
        alert('ERROR: Data could not be returned from database')
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

  const handleDeletePerson = (personToDelete) => {    
    const userConfirmed = window.confirm(`Are you sure you want to remove ${personToDelete.name} from the phonebook?`)

    if (userConfirmed) {
      personsService.deletePerson(personToDelete.id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== personToDelete.id)
          
          alert(`${personToDelete.name} was succesfully deleted`)
          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons)
        }) 
        .catch(error => {
          alert(`ERROR: ${personToDelete.name} was not found in database`)
          return
        })
    }
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
      id: persons.length + 1,
      name: newName,
      phone: newPhone,
    }

    const personFound = persons.find(person => person.name === personObject.name)

    if (!personObject.name || !personObject.name.trim().length) {
      alert("Person's name can not be empty")
    }
    else if (!personObject.phone || !personObject.phone.trim().length) {
      alert("Person's phone can not be empty")
    }
    else if (personFound) {
      const userConfirmed = window.confirm(personFound.name + " alredy exists in the phonebook. Do you want to replace the old phone number with the new one?")

      if (userConfirmed) {
        personsService.updatePerson(personFound.id, personObject)
          .then(() => 
            {
              alert(`${personFound.name}'s phone number was updated`)
              personsService.getAllPersons()
                .then(response => {
                  setPersons(response)
                  setFilteredPersons(response)
                })
                .catch(error => {
                  alert('ERROR: Data could not be returned from database')
                })
            })
          .catch(error => {
            alert('ERROR: Phone number could not be updated')
          })
      }
    }
    else {
      setNewName('')
      setNewPhone('')
      setPersons(persons.concat(personObject))
      setFilteredPersons(persons.concat(personObject))
      personsService.createPerson(personObject)
        .catch(error => {
          alert('ERROR: New person could not be created')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addFilter}>
        <div>Search contacts: 
          <input value={newFilter} onChange={handleFilterChange} />
          <button className='primary' type="submit">Filter</button>
          <button className='primary' type="submit" onClick={clearFilter}>
            Clear filter
          </button>
        </div>
        <br/><br/>
      </form>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> 
          phone: <input type="tel" value={newPhone} onChange={handlePhoneChange} pattern="[0-9]{3}[0-9]{3}[0-9]{3}" />
          <small>Format: 123456789</small>
          <button className='primary' type="submit">Add Person</button>
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
          <div>
            <Person person={person} onDelete={() => handleDeletePerson(person)} />
          </div>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default App