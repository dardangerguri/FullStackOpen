import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY

const getWeather = (capital) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
  const request = axios.get(weatherURL)
  return request.then(response => response.data)
}

export default {getWeather}
