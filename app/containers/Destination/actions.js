
 

import {
    PICK_DESTINATION,
    PICK_DESTINATION_SUCCESS,
    PICK_DESTINATION_ERROR, 
} from './constants';

/**
 * Dispatched when loading the repositories fails
 * 
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function pickDestination() {
  return {
    type: PICK_DESTINATION,
  };
}

export function setDestination(destination, response) {
  return {
    type: PICK_DESTINATION_SUCCESS,
    destination,
    response
  }
}

export function pickDestinationError(error) {
  return {
    type: PICK_DESTINATION_ERROR,
    error
  }
}