import express, { Router, Request, Response } from 'express'
import patientsData from '../data/patients'
import { Patient, PatientNoSsn } from '../data/types'

const patientsRouter: Router = express.Router()

patientsRouter.get('/', (req: Request, res: Response) => {
  const patients: Patient[] = patientsData

  const response: PatientNoSsn[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {
      id, name, dateOfBirth, gender, occupation
    })
  )


  res.status(200).send(response)
})

export default patientsRouter