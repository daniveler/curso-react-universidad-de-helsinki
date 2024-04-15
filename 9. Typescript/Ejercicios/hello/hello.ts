import express, { Express, Request, Response } from 'express'

const app: Express = express()
const PORT = 3001

app.get('/hello', (req: Request, res: Response) => {
  if(!req.body) {
    res.json({ message: 'Hello, Full-Stack!' })
  } 
})

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})