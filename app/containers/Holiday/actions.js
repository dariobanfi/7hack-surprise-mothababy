export function changeEmotion(emotion) {
  return {
    type: 'CHANGE_EMOTION',
    emotion,
  };
}


export function changeInterests(interestObj) {
  return {
    type: 'CHANGE_INTERESTS',
    interestObj,
  };
}
