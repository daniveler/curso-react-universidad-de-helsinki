import Country from './Country.js'

function CountriesList({ listCountries }) {

  var isOnly = false

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

  if (listCountries.length === 1) {
    isOnly = true
  }
   

  return (
    <div>
      <ul>
        {listCountries.map(country => {
          return <Country isOnly={isOnly} country={country} />
        })}
      </ul>
    </div>
  )
}

export default CountriesList