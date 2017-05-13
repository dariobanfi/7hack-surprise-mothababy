/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({
  emotion: null,
  interests: {}
});

function holidayReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_EMOTION':
      return state
        .set('emotion', action.emotion);
    case 'CHANGE_INTERESTS':
      let previousInterestValue = state.get('interests').get(action.interestObj.interestName);
      if (!previousInterestValue) {
        previousInterestValue = 0;
      }
      return state
        .set('interests', state.get('interests').set(action.interestObj.interestName, previousInterestValue + action.interestObj.interestVal));
    default:
      return state;
  }
}

export default holidayReducer;
