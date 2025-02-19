import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryDetails = ({country}) => {
  const [weather, setWeather] = useState(null)

  const weatherData = () => {
    weatherService
    .getWeather(country.capital)
    .then(weatherData => {
      setWeather(weatherData)
    })
    .catch(error => {
      console.error('Error fetching weather data:', error)
    })
  }

  useEffect(weatherData, [country])

  if (!weather) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        Capital {country.capital} <br />
        Area {country.area}
        <h2>Languages</h2>
        <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
        <h2>Weather in {country.capital}</h2>
        Loading weather data...
      </div>
    )
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      Capital {country.capital} <br />
      Area {country.area}
      <h2>Languages</h2>
      <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      <h2>Weather in {country.capital}</h2>
      Temperature {weather.main.temp} Celsius <br />
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" /> <br />
      Wind {weather.wind.speed} m/s
    </div>
  )
}

export default CountryDetails
