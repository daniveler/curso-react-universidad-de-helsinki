interface TotalProps {
  total: number
}

const Total = (props: TotalProps) => {
  return <h2>Number of exercises: {props.total}</h2>
}

export default Total