import { createSelector } from 'reselect';

const selectConfirmation = (state) => state.get('confirmation');

const makeSelectOccasion = () => createSelector(
  selectConfirmation,
  (confirmationState) => confirmationState.get('occasion')
)


export {
  makeSelectOccasion
}
