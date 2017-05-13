
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

export function requestProducts(occasion) {
  return {
    type: REQUEST_PRODUCTS,
    occasion
  }
}

export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS'

export function requestProductsSuccess(apparelType, products) {
  return {
    type: REQUEST_PRODUCTS_SUCCESS,
    apparelType,
    products
  }
}

export const REQUEST_PRODUCTS_ERROR = 'REQUEST_PRODUCTS_ERROR'

export function requestProductsError(error) {
  return {
    type: REQUEST_PRODUCTS_ERROR,
    error
  }
}

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
