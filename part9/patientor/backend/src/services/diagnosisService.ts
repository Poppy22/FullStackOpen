import diagnosisData from '../data/diagnose.json'
import { Diagnosis } from '../types'

const diagnosis = diagnosisData as Diagnosis[]

const getAllDiagnosis = () => {
  return diagnosis
}

const getByCode = (code: string) => {
  return diagnosis.find((d) => d.code === code)
}

export default {
  getAllDiagnosis,
  getByCode,
}
