const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] :response-time ms :body"))

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(people)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${people.length} people.<\p><p>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const p = people.find(e => e.id == id)

  if (!p) {
    response.status(404).end();
  } else {
    response.json(p)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  people = people.filter(e => e.id != id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name == undefined || body.number == undefined) {
    response.status(400).json({
      "error": "Expected name and number in request body"
    })
    return
  }

  const person = people.filter(e => e.name === body.name)
  if (person.length > 0) {
    response.status(400).json({
      "error": "There is already a contact with this name"
    })
    return
  }

  const newPerson = {
    id: Math.max(...people.map(e => e.id)) + 1,
    name: body.name,
    number: body.number
  }

  people.push(newPerson)
  response.status(200).json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
