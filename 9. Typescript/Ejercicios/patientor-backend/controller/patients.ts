import express, { Router, Request, Response } from 'express'
import { Patient, PatientNoSsn } from '../data/types'
import patientService from '../services/patientService'

const patientsRouter: Router = express.Router()

patientsRouter.get('/', (req: Request, res: Response) => {
  const patients: PatientNoSsn[] = patientService.getPatientsNoSsl()

  res.status(200).send(patients)
})

patientsRouter.get('/:id', (req: Request, res: Response) => {
  const patient = patientService.getPatientById(req.params.id)

  if(patient) {
    res.status(200).send(patient)
  }
  else {
    res.status(404).json({ error: 'Patient not found' })
  }
})

patientsRouter.post('/', (req: Request, res: Response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body
  
  const addedPatient: Patient = patientService.addNewPatient({
    name, dateOfBirth, ssn, gender, occupation
  })

  res.json(addedPatient)
})

export default patientsRouter