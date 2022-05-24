import express from 'express'
import cors from 'cors'
import patientsRouter from './routes/patients'
import doctorsRouter from './routes/doctors'
import diagnosisRouter from './routes/diagnosis'
const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (_req, res) => {
  console.log('someone pinged here !!!!!!!!')
  res.send('pong')
})

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here !!!!!!!!')
  res.send('pong')
})

app.use('/api/patients', patientsRouter)
app.use('/api/doctors', doctorsRouter)
app.use('/api/diagnosis', diagnosisRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
