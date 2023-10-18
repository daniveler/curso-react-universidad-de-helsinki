import React, { useState } from 'react'

function Country({ country }) {

  const [showingCountry, setShowingCountry] = useState(false)

  const toggleShowing = () => {
    setShowingCountry(!showingCountry)
  }

  return (
    <div>
      <li>
        {
          !showingCountry 
            ? country.name.common
            : (
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

        <button onClick={toggleShowing}>
          {!showingCountry ? 'Show details' : 'Hide details'}
          </button>

      </li>
    </div>
  )
}

export default Country