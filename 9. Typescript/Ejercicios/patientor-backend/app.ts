import express, { Express } from 'express'
import diagnosesRouter from './controller/diagnoses'

const app: Express = express()

app.use('/api/diagnoses', diagnosesRouter)

export default app