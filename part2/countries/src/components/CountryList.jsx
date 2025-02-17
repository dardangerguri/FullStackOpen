const CountryList = ({countries}) => {
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
        <span key={country.name.common}>{country.name.common} <br /></span>
      ))}
    </div>
  )
}

export default CountryList
