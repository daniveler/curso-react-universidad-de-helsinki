import express, { Express, Request, Response } from 'express'
import { BmiResult, calculateBmi } from '../bmi-calculator/bmiCalculator'

const app: Express = express()
const PORT: Number = 3001

app.get('/bmi', (req: Request, res: Response) => {
  if(!req.query || !req.query.height || !req.query.weight) {
    return res.status(400).json({ error: 'Query parameters were not sent'})
  }
  
  const height: number = parseFloat(req.query.height as string)
  const weight: number = parseFloat(req.query.weight as string)

  console.log(height + ' ' + weight)

  let bmi: BmiResult

  try {
    bmi = calculateBmi(height, weight)
  }
  catch (e) {
    return res.status(500).json({ error: e.message })
  }

  return res.status(200).json({ weight, height, bmi }) 
}) 

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
