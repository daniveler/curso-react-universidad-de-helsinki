import React from "react"

const Person = ({ person, onDelete }) => {
    const deletePerson = () => {
        onDelete(person)
    }
    
    return  (
        <tr>
            <td>{person.name}</td>
            <td>{person.phone}</td> 
            <button className="delete" onClick={() => { deletePerson(person) }}>Delete</button> 
        </tr>
    )
}

export default Person