/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  PICK_DESTINATION,
  PICK_DESTINATION_SUCCESS,
  PICK_DESTINATION_ERROR, } from './constants';

import { pickDestination, setDestination, pickDestinationError } from './actions';
import { makeSelectRegion } from './selectors'
import request from 'utils/request';

export function* getDestinations() {

  let region = yield select(makeSelectRegion())
  region = region || 90
  //var destinationQuery = "Athen"
  //const destinations_api_endpoint = `http://wegde.instigator.io/weg.de/v1/destinations?apikey=7Hack%212017&query=${destinationQuery}`
  const products_api_endpoint  = `http://wegde.instigator.io/weg.de/v1/products?apikey=7Hack%212017&channel=PACKAGE&region=${region}&price=200`
  //var regionId = 0;

  // fetch(destinations_api_endpoint)
  // .then(data => {
  //   return data.text()
  // })
  // .then(jsonData => {
  //   console.log(jsonData)
  //   regionId = jsonData.response.regions[0].regionId
  // })
  // .catch(err => {
  //   console.log(err);
  // })
  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, products_api_endpoint);
    yield put(setDestination(destination, data.response));
  } catch (err) {
    yield put(pickDestinationError(err));
  }
}

export function*  destinationData() {

  const watcher = yield takeLatest(PICK_DESTINATION, getDestinations);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  destinationData
];
