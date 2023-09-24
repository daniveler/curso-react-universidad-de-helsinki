import React from 'react'

const Part = (props) => {
    return (
      <>
        <h2>{props.part}</h2>
        <p>Exercises: {props.exercises}</p>
      </>
    )
  }

export default Part
