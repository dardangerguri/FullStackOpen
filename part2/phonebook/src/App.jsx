import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const hook = () => {
    phonebookService
    .getAll()
    .then(phonebookList => {
      setPersons(phonebookList)
    })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('Clicked add', event.target)

    if (!newName.trim()) {
      return
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    phonebookService
      .create(personObject)
      .then(newContact => {
        setPersons(persons.concat(newContact))
      })
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterTextChange = (event) => {
    console.log(event.target.value)
    setFilterText(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
