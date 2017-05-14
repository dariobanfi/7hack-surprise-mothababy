/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectDestination = (state) => state.get('destination');

const makeSelectRegion = () => createSelector(
  selectDestination,
  (destinationState) => destinationState.get('region')
);

export {
  makeSelectRegion,
};
