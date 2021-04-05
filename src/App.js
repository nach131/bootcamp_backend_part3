// import './App.css';
import React, { useState, useEffect } from 'react'
import { Filter } from './components/Filter';
import Persons from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { getAll, create, deletePerson } from './services/index';



const App = () => {

  const [term, setTerm] = useState("");

  const [persons, setPersons] = useState([])

  useEffect(() => {
    getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const filteredPersons = term
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(term.toLowerCase())
    )
    : persons;

  const handleSearch = (event) => {
    const term = event.target.value;
    setTerm(term);
  };


  const handleNewName = (event) => {
    setNewName(event.target.value)
    // console.log(newName)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
    // console.log(newName)
  }

  const addPerson = (event) => {
    const existingPerson = persons.find((p) => p.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personToAddToState = {
        name: newName,
        number: newNumber,
      }

      create(personToAddToState)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          console.log(returnedPerson);
        })
    }
  }

  const handleDelete = ({ name, id }) => {
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Filter term={term} handleSearch={handleSearch} />

      <h2 className="pt-3">add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h2 className="pt-4">Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App