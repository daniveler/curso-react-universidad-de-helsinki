import React from 'react'

const Part = ({ part }) => {
  return (
    <>
      <li key={part.id}><h2>{part.name}.</h2> Exercises: {part.exercises}</li>
    </>
  )
}

export default Part
