import { createSelector } from 'reselect';

const selectEmotion = (state) => state.get('holiday');

const makeSelectEmotion = () => createSelector(
  selectEmotion,
  (emotionState) => emotionState.get('emotion')
);


const makeSelectInterests = () => createSelector(
  selectEmotion,
  (holidayState) => holidayState.get('interests')
);


export {
  selectEmotion,
  makeSelectEmotion,
  makeSelectInterests
};
