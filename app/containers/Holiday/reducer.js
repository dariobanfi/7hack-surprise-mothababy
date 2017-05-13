/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({
  data: null
});

function holidayReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
