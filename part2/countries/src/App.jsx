import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])

  const hook = () => {
    countriesService
    .getAll()
    .then(countriesList => {
      setCountries(countriesList)
    })
  }

  useEffect(hook, [])

  const filterCountries = () => {
    if (!search) {
      setFiltered([])
      return
    }
    setFiltered(
      countries.filter(({name}) =>
        name.common.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  useEffect(filterCountries, [search, countries])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries
      <input value={search} onChange={handleSearch} />
      {filtered.length === 1 && <CountryDetails country={filtered[0]} />}
      {filtered.length !== 1 && <CountryList countries={filtered} />}
    </div>
  )
}

export default App
