require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] :response-time ms :body"))
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', async (request, response) => {
  const people = await Person.find({})
  response.json(people)
})

app.get('/info', async (request, response) => {
  response.send(`<p>Phonebook has info for ${await Person.countDocuments({})} people.<\p><p>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const p = await Person.findById(id)

  if (!p) {
    response.status(404).end();
  } else {
    response.json(p)
  }
})

app.delete('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  await Person.deleteOne({_id: id})
  response.status(204).end()
})

app.post('/api/persons', async (request, response) => {
  const body = request.body

  if (body.name == undefined || body.number == undefined) {
    response.status(400).json({
      "error": "Expected name and number in request body"
    })
    return
  }

  try {
    const newPerson = new Person({ name: body.name, number: body.number })
    const savedPerson = await newPerson.save()

    response.status(201).json(savedPerson)
  } catch (e) {
    if (e.name === "ValidationError") {
      response.status(400).json({
        "error": e.message
      })
    } else {
      response.status(400).json({
        "error": "There is already a contact with this name"
      })
    }
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
