import React from 'react'

function Country({ isOnly, country }) {

    if (isOnly) {
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <div>
            <p>Languages: </p>
            <ul>
              {
                Object.entries(country.languages).map(([key, value]) => {
                  return <li>{value}</li>
                })
              }
            </ul>
          </div>
          <div>
            <p>Flag: </p>
            <img src={country.flags.png} alt='country flag'></img>
          </div>
        </div>
      )
    }

  return (
    <div>
      <li>{country.name.common}</li>
    </div>
  )
}

export default Country