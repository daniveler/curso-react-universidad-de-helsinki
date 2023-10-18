import CountryFinder from './components/CountryFinder';
import { useEffect, useState } from 'react';
import getAllCountries from './services/countries.js'


function App() {
  const [ listCountries, setListCountries ] = useState([])
  
  useEffect(() => {
    getAllCountries
      .getAllCountries()
      .then(response => {
        setListCountries(response)
      })
  }, [setListCountries])

  return (
    <div className="App">
      <CountryFinder listCountries={listCountries} />
    </div>
  );
}

export default App;
