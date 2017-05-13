/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { PICK_DESTINATION } from 'containers/App/constants';

import request from 'utils/request';

export function* getDestinations() {

  const destionation = "turkey"
  const products_api_endpoint = "http://7hack.comvel.net:80/weg.de/v1/products?apikey=7Hack%212017&channel=HOTEL"

  console.log("gestDestinations saga called")

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, products_api_endpoint, {'mode': 'no-cors'});

    yield put(destionation(destination));
  } catch (err) {
    yield put(repoLoadingError(err));
  }

}

export function*  destinationData() {
  console.log("destinationData called")
  const watcher = yield takeLatest(PICK_DESTINATION, getDestinations);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  destinationData,
];
