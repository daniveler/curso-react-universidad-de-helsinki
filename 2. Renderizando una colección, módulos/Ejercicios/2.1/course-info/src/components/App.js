import Course from './Course';

const App = () => {
  const courses = 
    [ 
      {
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
        ]
      }
    ]

  return (
    <>
    <p>
      {courses.map(course => (
          <Course key={course.id} course={course} />
        ))}
    </p>
      
      <Footer />
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

export default App
