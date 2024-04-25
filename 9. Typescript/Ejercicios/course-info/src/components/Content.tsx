import Part from "./Part"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => (
  <Part courseParts={props.courseParts} />
)

export default Content