import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
    var totalExercises = 0

    return (
        <>
            <ul>
                { course.parts.map(part => {
                    totalExercises += part.exercises
                    return <Part part={part} />
                })
                }
            </ul>
            <h3>Total exercises: {totalExercises}</h3>
        </>
    )
}

export default Content
