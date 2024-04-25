interface ContentProps {
  courseParts: CourseParts[]
}

interface CourseParts {
  name: string, 
  exerciseCount: number
}

const Content = (props: ContentProps) => {
  return props.courseParts.map(part => 
    <p>{part.name}: {part.exerciseCount}</p>
  )
}

export default Content