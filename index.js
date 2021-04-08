require('dotenv').config()
require('./mongo')

const express = require('express');
const cors = require('cors');
const Person = require('./model/Persons')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

let persons = [

]

app.get('/api/persons', (req, res) => {
  // res.json(persons)
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {

  const registros = persons.length
  // console.log(registros);
  const date = Date()
  // console.log(date);
  res.send(`<p>Phonebook has info for ${registros} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        return res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))

})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const person = req.body
  const newPersoInfo = {
    name: person.name,
    number: person.number
  }

  Person.findByIdAndUpdate(id, newPersoInfo, { new: true })
    .then(result => {
      res.json(result)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person.findByIdAndDelete(id).then(() => {
    res.status(204).end()
  })
    .catch(error => next(error))
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body

  if (!person || !person.name) {
    return res.status(400).json({
      error: 'person.name is missing'
    })
  }
  const newPerson = new Person({
    name: person.name,
    number: person.number
  })
  newPerson.save().then(savedPerson => {
    res.json(savedPerson)
  })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server esta en el puerto ${PORT}`);
})