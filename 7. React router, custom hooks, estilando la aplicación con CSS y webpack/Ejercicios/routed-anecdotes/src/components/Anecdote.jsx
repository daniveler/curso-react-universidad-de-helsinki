import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <h3>{anecdote.author}</h3>
      <a href={anecdote.info}>More info here</a>
      <p>Votes: {anecdote.votes}</p>
    </div>
  )
}

export default Anecdote