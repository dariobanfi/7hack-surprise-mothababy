import { fromJS } from 'immutable';

import {
  PICK_DESTINATION,
  PICK_DESTINATION_SUCCESS,
  PICK_DESTINATION_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  destination: {},
  response: null,
  region: null,
});


function destinationReducer(state = initialState, action) {
  switch (action.type) {
    case PICK_DESTINATION:
      return state
        .set('loading', true)
        .set('error', false)
        .set('destination', {})
        .set('response', null)
        .set('region', action.region)
    case PICK_DESTINATION_SUCCESS:
      return state
        .set('destination', action.destination)
        .set('response', action.response)
        .set('loading', false)
    case PICK_DESTINATION_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
    default:
      return state;
  }
}

export default destinationReducer
