import { fromJS } from 'immutable';

import {
  REQUEST_PRODUCTS,
  REQUEST_PRODUCTS_SUCCESS,
  REQUEST_PRODUCTS_ERROR,
  REQUEST_WEATHER,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_ERROR,
} from './actions'

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  occasion: null,
  tops: [],
  pants: [],
  shoes: [],
  coordinates: {},
  weather: null
})

function confirmationReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('occasion', action.occasion)
        .set('tops', [])
        .set('pants', [])
        .set('shoes', [])
    case REQUEST_PRODUCTS_SUCCESS:
      return state
        .set(action.apparelType, action.products)
        .set('loading', false)
    case REQUEST_PRODUCTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
    case REQUEST_WEATHER:
      return state
        .set('coordinates', action.coordinates)
        .set('weather', null)
    case REQUEST_WEATHER_SUCCESS:
      return state
        .set('weather', action.weather)
    case REQUEST_WEATHER_ERROR:
      return state
      .set('error', action.error)
    default:
      return state
  }
}

export default confirmationReducer
