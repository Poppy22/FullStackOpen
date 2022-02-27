require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { errorHandler } = require('./utils/errorMiddleware')

const app = express()
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', async (request, response) => {
  const people = await Person.find({})
  response.json(people)
})

app.get('/info', async (request, response) => {
  response.send(
    `<p>Phonebook has info for ${await Person.countDocuments({})} people.</p><p>${new Date().toString()}</p>`,
  )
})

app.get('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const p = await Person.findById(id)

  if (!p) {
    response.status(404).end()
  } else {
    response.json(p)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Person.deleteOne({ _id: id })
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body

  try {
    const savedPerson = await new Person({ name, number }).save()

    response.status(201).json(savedPerson)
  } catch (err) {
    next(err)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      { _id: id },
      { name, number },
      { new: true, runValidators: true, context: 'query' },
    )

    response.status(200).json(updatedPerson)
  } catch (err) {
    next(err)
  }
})

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
