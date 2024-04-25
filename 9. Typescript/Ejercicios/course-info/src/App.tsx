import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const courseName: string  = "Half Stack application development";

const App = () => {

  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App
