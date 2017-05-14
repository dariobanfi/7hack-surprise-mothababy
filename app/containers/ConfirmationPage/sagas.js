/**
 * Gets the repositories of the user from Github
 */

import _ from 'lodash'
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { REQUEST_PRODUCTS } from './actions'
import {
  requestProductsSuccess,
  requestProductsError,
} from './actions'

import request from 'utils/request'
import { makeSelectOccasion } from './selectors'

/**
 * Github repos request/response handler
 */
export function* getProducts() {
  // Select username from store
  const occasion = yield select(makeSelectOccasion())
  //const requestURL = `http://instigator.io/products?apiKey=H6490912AB3211E680F576304DEC7EB7&page_items=50&sort_by=relevance&gender=men&occasion=4008`
  const makeUrl = (categoryId) => `http://stylight.instigator.io/products?apiKey=H6490912AB3211E680F576304DEC7EB7&page_items=50&sort_by=relevance&occasion=${occasion}&gender=women&category=${categoryId}`

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

// Bootstrap sagas
export default [
  productsData,
]
