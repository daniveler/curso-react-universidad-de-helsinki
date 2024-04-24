import express, { Router, Request, Response } from 'express'
import diagnosesData from '../data/diagnoses'
import { Diagnose } from '../data/types'

const diagnosesRouter: Router = express.Router()

diagnosesRouter.get('/', (req: Request, res: Response) => {
  const diagnoses: Diagnose[] = diagnosesData
  
  res.status(200).send(diagnoses)
})

export default diagnosesRouter