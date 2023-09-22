import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <p>
        <h1>Welcome to the course: {props.course}</h1>
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        <Part part={props.part1} exercises={props.exercises1} />
        <Part part={props.part2} exercises={props.exercises2} />
        <Part part={props.part3} exercises={props.exercises3} />
      </p>
    </>
  )
}

const Footer = () => {
  return (
    <>
      <br /> <br />
      <p>
        greeting app created by <a href="https://github.com/daniveler">daniveler</a>
      </p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <h2>{props.part}</h2>
      <p>Exercises: {props.exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))