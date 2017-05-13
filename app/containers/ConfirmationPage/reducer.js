import { fromJS } from 'immutable';

import {
  REQUEST_PRODUCTS,
  REQUEST_PRODUCTS_SUCCESS,
  REQUEST_PRODUCTS_ERROR,
} from './actions'

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  occasion: null,
  products: {}
})

function confirmationReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('occasion', action.occasion)
        .set('products', {})
    case REQUEST_PRODUCTS_SUCCESS:
      return state
        .set('products', action.products)
        .set('loading', false)
    case REQUEST_PRODUCTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
    default:
      return state
  }
}

export default confirmationReducer
