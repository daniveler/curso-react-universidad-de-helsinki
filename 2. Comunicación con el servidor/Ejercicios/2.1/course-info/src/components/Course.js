import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = ({ course }) => {
  return (
      <>
          <Header name={course.name} />
          <Content course={course}/>
      </>      
  )
} 

export default Course
