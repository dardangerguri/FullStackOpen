import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Message from './components/Message'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [message, setMessage] = useState(null)

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

    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.find(person => person.name === newName)

    if (personExists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        phonebookService
          .update(personExists.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setMessage(`Changed ${newName}'s number`)
            setTimeout(() => setMessage(null), 5000)
          })
       return
    }

    phonebookService
      .create(personObject)
      .then(newContact => {
        setPersons(persons.concat(newContact))
        setMessage(`Added ${newName}`)
        setTimeout(() => setMessage(null), 5000)
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

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ? `)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <Message message={message}/>
        <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
