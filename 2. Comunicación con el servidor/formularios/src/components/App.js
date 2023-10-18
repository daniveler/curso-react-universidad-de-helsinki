import React, { useState, useEffect } from 'react'
import Note from './Note'
import axios from 'axios'
import noteService from './services/notes'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        noteService
          .getAll()
          .then(response => {
            setNotes(response.data)
          })
      }, [])
      
    const handleNoteChange = (event) => {
        // console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        axios
            .post('http://localhost:3001/notes', noteObject)
            .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
            })   
    }

    const notesToShow = showAll 
        ? notes
        : notes.filter(note => note.important === true)

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
    
        noteService
            .create(noteObject)
            .then(response => {
            setNotes(notes.concat(response.data))
            setNewNote('')
            })
        }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note 
                        key={note.id} 
                        note={note} 
                        toggleImportance={() => toggleImportanceOf(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App 