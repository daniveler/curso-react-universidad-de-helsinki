import express, { Express, Request, Response } from 'express'
import { BmiResult, calculateBmi } from '../bmi-calculator/bmiCalculator'
import { calculateExercise } from '../exercise-calculator/exerciseCalculator'

const app: Express = express()
const PORT: number = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/bmi', (req: Request, res: Response) => {
  if(!req.query || !req.query.height || !req.query.weight) {
    return res.status(400).json({ error: 'Query parameters were not sent'})
  }
  
  const height: number = parseFloat(req.query.height as string)
  const weight: number = parseFloat(req.query.weight as string)

  const bmi: BmiResult = calculateBmi(height, weight)

  return res.status(200).json({ weight, height, bmi }) 
}) 

app.get('/exercises', (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if(!req.body || !req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({ error: 'Request body was missing or invalid'})
  }

  if (!Array.isArray(req.body.daily_exercises) || !req.body.daily_exercises.every((num: number) => typeof num === 'number')) {
    return res.status(400).json({ error: 'Field daily_exercises must be an array of numbers' });
  }

  if (typeof req.body.target !== 'number') {
    return res.status(400).json({ error: 'Field target must be a number' });
  }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dailyExercises: number[] = req.body.daily_exercises as number[]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target as number

  return res.status(200).json(calculateExercise(dailyExercises, target)) 
})

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
