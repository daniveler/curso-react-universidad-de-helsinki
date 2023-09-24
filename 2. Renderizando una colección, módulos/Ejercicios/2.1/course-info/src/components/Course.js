import React from 'react'

const Course = ({ course }) => {
    return (
        <>
            <h1><Header name={course.name} /></h1>
            <Content course={course}/>
        </>
            
    )
} 

const Header = ({ name }) => {    
    return (
          <>
            Welcome to the course: {name}
          </>
    )
  }

const Content = ({ course }) => {    
    return (
      <>
        <ul>
            {course.parts.map(part => (
                    <Part part={part} />
                ))
                }   
        </ul>        
      </>
    )
  }

const Part = ({ part }) => {
    return (
        <>
            <li key={part.id}><h2>{part.name}.</h2> Exercises: {part.exercises}</li>
        </>
    )
}

export default Course
