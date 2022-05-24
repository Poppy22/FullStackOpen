export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>
export type NewPatientEntry = Omit<PatientEntry, 'id'>
export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry
