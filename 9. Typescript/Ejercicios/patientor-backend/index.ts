import express, { Express, Request, Response } from 'express'

const app: Express = express()
const PORT: number = 3001

app.get('/api/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Pong' })
})

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})