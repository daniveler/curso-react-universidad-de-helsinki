import Country from './Country.js'

function CountriesList({ listCountries }) {

  if (listCountries.length > 10) {
    return (
      <div>
        <p>Too many results... Search more specific country</p>
      </div>
    )
  }

  if (listCountries.length === 0) {
    return (
    <div>
      <p>No countries found</p>
    </div>
    )
  }
   

  return (
    <div>
      <ul>
        {listCountries.map(country => {
          return <Country  country={country} />
        })}
      </ul>
    </div>
  )
}

export default CountriesList