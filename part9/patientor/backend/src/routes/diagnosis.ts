import express from 'express'
import diagnosisService from '../services/DiagnosisService'

const router = express.Router()

router.get('/', (_req, res) => {
  const response = diagnosisService.getAllDiagnosis()
  res.send(response)
})

router.get('/:code', (req, res) => {
  const response = diagnosisService.getByCode(req.params.code)
  res.send(response)
})

export default router
