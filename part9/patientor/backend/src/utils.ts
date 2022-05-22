import { NewPatientEntry, Gender } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name:' + name)
  }
  return name
}

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn:' + ssn)
  }
  return ssn
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation:' + occupation)
  }
  return occupation
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isProperGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isProperGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  const { name, dateOfBirth, ssn, gender, occupation } = object as NewPatientEntry
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  }

  return newEntry
}

export default toNewPatientEntry
