import { createSelector } from 'reselect';

const selectEmotion = (state) => state.get('holiday');

const makeSelectEmotion = () => createSelector(
  selectEmotion,
  (emotionState) => emotionState.get('emotion')
);

export {
  selectEmotion,
  makeSelectEmotion,
};
