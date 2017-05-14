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


export const REQUEST_LOAN = 'REQUEST_LOAN'

export function requestLoan(amount) {
  return {
    type: REQUEST_LOAN,
    amount
  }
}

export const REQUEST_LOAN_SUCCESS = 'REQUEST_LOAN_SUCCESS'

export function requestLoanSuccess(conditions) {
  return {
    type: REQUEST_LOAN_SUCCESS,
    conditions
  }
}

export const REQUEST_LOAN_ERROR = 'REQUEST_LOAN_ERROR'

export function requestLoanError(error) {
  return {
    type: REQUEST_LOAN_ERROR,
    error
  }
}
