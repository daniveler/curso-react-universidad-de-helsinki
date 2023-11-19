require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Note = require('./models/note')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
      })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server Get All running on http://localhost:${PORT}/api/notes`)
})