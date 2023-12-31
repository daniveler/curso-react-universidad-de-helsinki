import React, { useState } from 'react'
import '../styles/CountryFinder.css'
import CountriesList from './CountriesList'

function CountryFinder({ listCountries }) {
  const [ searchedCountry, setSearchedCountry ] = useState('')
  
  const handleSearchedCountryChange = (e) => {
    setSearchedCountry(e.target.value)
  }

  const filteredCountries = listCountries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))

  return (
    <div>
      Search country: <input value={searchedCountry} onChange={handleSearchedCountryChange}></input>
      <CountriesList listCountries={filteredCountries}></CountriesList>
    </div>
  )
  
}

export default CountryFinder