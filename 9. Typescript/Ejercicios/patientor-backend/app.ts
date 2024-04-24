import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import diagnosesRouter from './controller/diagnoses'
import patientsRouter from './controller/patients'

const app: Express = express()

app.use(cors())
app.use(express.json())

app.get('/api/ping', (req: Request, res: Response) => {
  res.send('Pong')
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

export default app