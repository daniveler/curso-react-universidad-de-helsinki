import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <p>
        <h1>Welcome to the course: {props.course}</h1>
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <h2>{props.part1}</h2>
        <p>Exercises: {props.exercises1}</p>
        <h2>{props.part2}</h2>
        <p>Exercises: {props.exercises2}</p>
        <h2>{props.part3}</h2>
        <p>Exercises: {props.exercises3}</p>
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      <br/> <br/>
      <p>
      greeting app created by <a href="https://github.com/daniveler">daniveler</a>
      </p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}
        exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))