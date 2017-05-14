import { fromJS } from 'immutable';

import {
  REQUEST_WEATHER,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_ERROR,
} from './actions'

// The initial state of the App
const initialState = fromJS({
  error: false,
  coordinates: {},
  weather: null
})

function summaryReducer(state = initialState, action) {
  switch (action.type) {
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

export default summaryReducer
