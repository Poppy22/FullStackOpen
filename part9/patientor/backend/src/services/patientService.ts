import patientsData from '../data/patients.json'
import { NewPatientEntry, NonSensitivePatientEntry } from '../types'
import { v1 as uuid } from 'uuid'

const patients = patientsData as NonSensitivePatientEntry[]

const getPatients = () => {
  return patients
}

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
}
