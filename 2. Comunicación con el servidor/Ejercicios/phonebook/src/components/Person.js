import React from "react"

const Person = (props) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.phone}</td> 
    </tr>
)

export default Person