/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { REQUEST_PRODUCTS } from './actions'
import { requestProductsSuccess, requestProductsError } from './actions'

import request from 'utils/request'
import { makeSelectOccasion } from './selectors'

/**
 * Github repos request/response handler
 */
export function* getProducts() {
  // Select username from store
  const occasion = yield select(makeSelectOccasion())
  console.log(occasion)
  const requestURL = `http://api-hack.stylight.net/products?apiKey=H6490912AB3211E680F576304DEC7EB7&page_items=50&sort_by=relevance&gender=men&occasion=4008`

  try {
    // Call our request helper (see 'utils/request')
    const products = yield call(request, requestURL, {
      mode: 'no-cors',
    })
    console.log(products)
    yield put(requestProductsSuccess(products));
  } catch (err) {
    yield put(requestProductsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle

export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_REPOS, getRepos);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
*/

export function* productsData() {
  const watcher = yield takeLatest(REQUEST_PRODUCTS, getProducts)

  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// Bootstrap sagas
export default [
  //githubData,
  productsData
]
