const CountryList = ({countries, setSearch}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  }

  return (
    <div>
      {countries.map((country) => (
        <span key={country.name.common}>{country.name.common}
          <button onClick={() => setSearch(country.name.common)}>Show</button> <br />
        </span>
      ))}
    </div>
  )
}

export default CountryList
