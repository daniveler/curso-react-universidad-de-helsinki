import http, { Server } from 'http'
import app from './app'

const PORT: number = 3001

const server: Server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})