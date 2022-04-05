import express from 'express'
import bmiCalculator from './bmiCalculator'
import exerciseCalculator from './exerciseCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query['height'])
  const weight = Number(req.query['weight'])

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: 'malformatted parameters',
    })
    return
  }

  res.send({
    height,
    weight,
    bmi: bmiCalculator.computeBMI(height, weight),
  })
})

app.post('/calculate', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: number[]; target: number }

  if (target === undefined || daily_exercises === undefined) res.status(400).json({ error: 'parameters missing' })
  else if (isNaN(target) || !Array.isArray(daily_exercises)) res.status(400).json({ error: 'malformatted parameters' })
  else {
    if (daily_exercises.filter((e) => isNaN(e)).length > 0) {
      res.status(400).json({ error: 'malformatted parameters' })
      return
    }
  }

  const result = exerciseCalculator.compute(daily_exercises, target)
  res.send(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
