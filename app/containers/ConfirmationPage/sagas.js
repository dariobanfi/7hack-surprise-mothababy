/**
 * Gets the repositories of the user from Github
 */

import _ from 'lodash'
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { REQUEST_PRODUCTS, REQUEST_WEATHER } from './actions'
import {
  requestProductsSuccess,
  requestProductsError,
  requestWeatherSuccess,
  requestWeatherError
} from './actions'

import request from 'utils/request'
import { makeSelectOccasion, makeSelectCoordinates } from './selectors'
import md5 from 'md5'
import { mapWeatherCondition } from './utils'

/**
 * Github repos request/response handler
 */
export function* getProducts() {
  // Select username from store
  const occasion = yield select(makeSelectOccasion())
  //const requestURL = `http://instigator.io/products?apiKey=H6490912AB3211E680F576304DEC7EB7&page_items=50&sort_by=relevance&gender=men&occasion=4008`
  const makeUrl = (categoryId) => `http://instigator.io/products?apiKey=H6490912AB3211E680F576304DEC7EB7&page_items=50&sort_by=relevance&occasion=${occasion}&gender=women&category=${categoryId}`

  try {
    const apparel = [
      { type: 'tops', categoryId: 10472},
      { type: 'pants', categoryId: 10299},
      { type: 'shoes', categoryId: 10580},
    ]

    for (let apparelItem of apparel) {
      // Call our request helper (see 'utils/request')
      const response = yield call(request, makeUrl(apparelItem.categoryId))
      yield put(requestProductsSuccess(apparelItem.type, response.products))
    }
  } catch (err) {
    yield put(requestProductsError(err))
  }
}


export function* productsData() {
  const watcher = yield takeLatest(REQUEST_PRODUCTS, getProducts)

  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* getWeather() {
  // Select username from store
  const user = '7hack'
  const password = 'hacktheweather'

  const coordinates = yield select(makeSelectCoordinates())

  const cityLookup = ({longitude, latitude}) => {
    const checksum = md5(`${user}${password}${longitude}${latitude}`)
    return `http://rwds2.wetter.com/location/coordinates/lon/${longitude}/lat/${latitude}/user/${user}/cs/${checksum}`
  }

  const weatherLookup = (cityCode) => {
    const checksum = md5(`${user}${password}${cityCode}`)
    return `http://rwds2.wetter.com/forecast/weather/city/${cityCode}/user/${user}/cs/${checksum}`
  }
  try {
    const cityLookupResponse = yield call(request, cityLookup(coordinates))
    const cityCode = cityLookupResponse.search.result[0].city_code

    const response = yield call(request, weatherLookup(cityCode))
    const forecasts = _.toPairs(response.city.forecast).map(([key, val]) => val)

    const { minTemp, maxTemp } = forecasts.reduce((acc, val) => {
      return {
        minTemp: Math.min(Number(val.tn), acc.minTemp),
        maxTemp: Math.max(Number(val.tx), acc.maxTemp),
      }
    }, {minTemp: 1000, maxTemp: -1000 })

    const weatherConditions = forecasts.map((val) => val.w)
    const mostCommonWeatherCondition = _.chain(weatherConditions).countBy().toPairs().maxBy(_.last).head().value()
    const weatherCondition = mapWeatherCondition(Number(mostCommonWeatherCondition))

    yield put(requestWeatherSuccess({
      minTemp,
      maxTemp,
      weatherCondition,
    }))
  } catch (err) {
    yield put(requestWeatherError(err))
  }
}

export function* weatherData() {
  const watcher = yield takeLatest(REQUEST_WEATHER, getWeather)

  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}


// Bootstrap sagas
export default [
  productsData,
  weatherData,
]
