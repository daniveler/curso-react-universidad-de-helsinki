import { useEffect, useState } from 'react'
import {
  Routes, Route, Navigate,
  useLocation
} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const location = useLocation()

  useEffect(() => {
    if(location.state) {
      toast.success('New anecdote:  ' + location.state.created + ' was created!')
    }
  }, [location])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Header />
      
      <Routes>
        <Route path="/" element={<Navigate replace to="/anecdotes" />} />
        <Route path="/anecdotes" element={ <AnecdoteList anecdotes={anecdotes}/> } />
        <Route path="/anecdotes/:id" element={ <Anecdote anecdotes={anecdotes}/> } />
        <Route path="/create" element={<CreateNew addNew={addNew}/> } />
        <Route path="/about" element={ <About /> } />
      </Routes>
      
      <Footer />
      <ToastContainer
        id='toast-container'
        position="bottom-right"
        autoClose={10000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
