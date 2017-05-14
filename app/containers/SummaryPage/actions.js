export const REQUEST_WEATHER = 'REQUEST_WEATHER'

export function requestWeather(coordinates) {
  return {
    type: REQUEST_WEATHER,
    coordinates
  }
}

export const REQUEST_WEATHER_SUCCESS = 'REQUEST_WEATHER_SUCCESS'

export function requestWeatherSuccess(weather) {
  return {
    type: REQUEST_WEATHER_SUCCESS,
    weather
  }
}

export const REQUEST_WEATHER_ERROR = 'REQUEST_WEATHER_ERROR'

export function requestWeatherError(error) {
  return {
    type: REQUEST_WEATHER_ERROR,
    error
  }
}
