import { useEffect, useState } from "react"

const Country = ({ country }) => {
  const notFound = (
    <div>
        not found...
      </div>
  )

  const found = (country) => (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )

  if (!country) {
    return notFound
  }
  else {
    return found(country)
  }
} 

export default Country