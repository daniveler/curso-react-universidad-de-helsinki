import React from "react";
import Part from "./Part";

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

export default Content
