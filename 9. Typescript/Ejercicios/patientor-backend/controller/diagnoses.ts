import express, { Router, Request, Response } from 'express'
import diagnosesService from '../data/diagnoses'
import { Diagnose } from '../data/types'

const diagnosesRouter: Router = express.Router()

diagnosesRouter.get('/', (req: Request, res: Response) => {
  const diagnoses: Diagnose[] = diagnosesService
  
  res.status(200).json({ data: diagnoses
   })
})

export default diagnosesRouter