import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectOccasion = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('occasion')
)

export {
  makeSelectOccasion
}
