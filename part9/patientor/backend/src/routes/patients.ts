import express from 'express'
import patientService from '../services/patientService'
import { toNewPatientEntry, toNewEntry } from '../utils'
import { Entry } from '../types'

const router = express.Router()

router.get('/', (_req, res) => {
  const response = patientService.getNonSensitivePatientEntries()
  res.send(response)
})

router.get('/:id', (req, res) => {
  const response = patientService.getById(req.params.id)
  res.send(response)
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)

    const addedEntry = patientService.addPatient(newPatientEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const entry: Entry = toNewEntry(req.body)
    const updatedPatient = patientService.addEntry(req.params.id, entry)
    res.json(updatedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
