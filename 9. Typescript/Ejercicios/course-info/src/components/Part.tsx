interface PartProps {
  courseParts: CoursePart[]
}

const Part = (props: PartProps) => {
  return props.courseParts.map(part => {
    switch(part.kind) {
      case 'basic':
        return <>
          <h3>{part.name}: {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </>
      case 'group':
        return <>
          <h3>{part.name}: {part.exerciseCount}</h3> 
          <p>Groups: {part.groupProjectCount}</p>
        </>
      case 'background':
        return <>
          <h3>{part.name}: {part.exerciseCount}</h3> 
          <p>{part.description}</p>
          <p>Background Material: {part.backgroundMaterial}</p>
        </>
      case 'special': 
      return <>
        <h3>{part.name}: {part.exerciseCount}</h3>
        <p>{part.description}</p>
        <p>Requirements: {part.requirements.map(req => `${req} `)}</p>
    </>
      default:
        return
    }
  })
}

export default Part