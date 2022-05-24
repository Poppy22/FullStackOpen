import patientsData from '../data/patients'
import { NewPatientEntry, NonSensitivePatientEntry, Entry } from '../types'
import { v1 as uuid } from 'uuid'

const patients = patientsData as NonSensitivePatientEntry[]

const getPatients = () => {
  return patients
}

const getById = (id: string) => {
  return patients.find((p) => p.id === id)
}

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }))
}

const addPatient = (entry: NewPatientEntry) => {
  const newPatient = {
    id: uuid(),
    ...entry,
  }

  patients.push(newPatient)
  return newPatient
}

const addEntry = (id: string, entry: Entry): NonSensitivePatientEntry | undefined => {
  const patient = patients.find((e) => e.id === id) as NonSensitivePatientEntry
  patient.entries.push(entry)
  return patient
}

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  getById,
  addEntry,
}
