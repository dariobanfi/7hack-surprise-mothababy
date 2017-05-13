/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({
  emotion: null,
});

function holidayReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_EMOTION':
      return state
        .set('emotion', action.emotion);
    default:
      return state;
  }
}

export default holidayReducer;
