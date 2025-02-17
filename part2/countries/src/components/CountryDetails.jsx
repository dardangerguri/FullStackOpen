const CountryDetails = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      Capital {country.capital} <br />
      Area {country.area}

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((languages) => (
          <li key={languages}>{languages}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
    </div>
  )
}

export default CountryDetails
