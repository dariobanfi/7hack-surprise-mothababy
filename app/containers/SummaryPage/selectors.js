import { createSelector } from 'reselect';

const selectSummary = (state) => state.get('summary');

const makeSelectCoordinates = () => createSelector(
  selectSummary,
  (summaryState) => summaryState.get('coordinates')
)

const makeSelectAmount = () => createSelector(
  selectSummary,
  (summaryState) => summaryState.get('amount')
)

export {
  makeSelectCoordinates,
  makeSelectAmount,
}
