
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

export function requestProducts(occasion) {
  return {
    type: REQUEST_PRODUCTS,
    occasion
  }
}

export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS'

export function requestProductsSuccess(products) {
  console.log(products)
  return {
    type: REQUEST_PRODUCTS_SUCCESS,
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
