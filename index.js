const express = require('express');
const cors = require('cors');
const { response } = require('express');

const app = express()

app.use(cors())
app.use(express.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "pedro",
    "number": "233232",
    "id": 8
  },
  {
    "name": "pablo",
    "number": "1313",
    "id": 9
  },
  {
    "name": "bulma",
    "number": "1212",
    "id": 10
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {

  const registros = persons.length
  // console.log(registros);
  const date = Date()
  // console.log(date);
  res.send(`<p>Phonebook has info for ${registros} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  person = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body

  newName = persons.find(p => p.name === person.name)

  console.log(newName);
  if (!person || !person.name || !person.number) {
    return res.status(400).json({
      error: 'person.name or person.number is missing'
    })
  } else if (newName) {
    return res.status(400).json({
      error: 'Ya existe el nombre'
    })
  } else {

    const ids = persons.map(p => p.id)
    const maxId = Math.max(...ids)

    const newPerson = {
      id: maxId + 1,
      name: person.name,
      number: person.number,
    }
    persons = [...persons, newPerson]
    res.status(201).json(newPerson)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server esta en el puerto ${PORT}`);
})