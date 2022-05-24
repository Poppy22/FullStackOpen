import { v1 as uuid } from 'uuid'
import {
  NewPatientEntry,
  Gender,
  Entry,
  BaseEntry,
  HealthCheckEntry,
  OccupationalHealthCareEntry,
  HospitalEntry,
} from './types'

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

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  const { name, dateOfBirth, ssn, gender, occupation } = object as NewPatientEntry
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  }

  return newEntry
}

const parseBaseEntry = (object: unknown): Omit<BaseEntry, 'id'> => {
  const { description, date, specialist, diagnosisCodes } = object as BaseEntry

  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description:' + description)
  }

  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date:' + date)
  }

  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist:' + specialist)
  }

  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes')
  }

  diagnosisCodes.forEach((dc) => {
    if (!isString(dc)) {
      throw new Error('diagnosisCodes contains a non-string element')
    }
  })

  return { description, date, specialist, diagnosisCodes }
}

export const toNewEntry = (object: unknown): Entry => {
  const { type } = object as Entry
  if (!type || !isString(type)) {
    throw new Error('Entry type must be a string.')
  }

  const baseEntry = parseBaseEntry(object)

  switch (type) {
    case 'HealthCheck': {
      const { healthCheckRating } = object as HealthCheckEntry
      if (
        isNaN(healthCheckRating) ||
        parseInt(`${healthCheckRating}`) !== healthCheckRating ||
        healthCheckRating < 0 ||
        healthCheckRating > 3
      ) {
        throw new Error('healthCheckRating must be a number between 0 and 3')
      }

      const entry: HealthCheckEntry = {
        id: uuid(),
        type,
        ...baseEntry,
        healthCheckRating,
      }

      return entry
    }
    case 'OccupationalHealthcare': {
      const { employerName, sickLeave } = object as OccupationalHealthCareEntry
      if (!isString(employerName)) {
        throw new Error('employerName must be a string')
      }

      if (sickLeave) {
        const { startDate, endDate } = sickLeave
        if (!startDate || !isString(startDate)) {
          throw new Error('startDate must exist and be a string')
        }

        if (!endDate || !isString(endDate)) {
          throw new Error('endDate must exist and be a string')
        }
      }

      const entry: OccupationalHealthCareEntry = {
        id: uuid(),
        type,
        ...baseEntry,
        employerName,
        sickLeave,
      }

      return entry
    }

    case 'Hospital': {
      const { discharge } = baseEntry as HospitalEntry
      if (!discharge) {
        throw new Error('discharge field missing')
      }

      const { date, criteria } = discharge
      if (!date || !isString(date)) {
        throw new Error('date must exist and be a string')
      }

      if (!criteria || !isString(criteria)) {
        throw new Error('criteria must exist and be a string')
      }

      const entry: HospitalEntry = {
        id: uuid(),
        type,
        ...baseEntry,
        discharge,
      }

      return entry
    }

    default:
      throw new Error('Wrong type for entry.')
  }
}
