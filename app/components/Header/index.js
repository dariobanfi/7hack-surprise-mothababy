import React from 'react';

import NavBar from './NavBar';
import { connect } from 'react-redux';
import { makeSelectEmotion } from './selectors';
import { createSelector } from 'reselect';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  mapEmotionToEmojii(emotion) {
    if (emotion === 'anger') {
      return '😡';
    }
    if (emotion === 'contempt') {
      return '😩';
    }
    if (emotion === 'disgust') {
      return '🤢';
    }
    if (emotion === 'happiness') {
      return '😁';
    }
    if (emotion === 'fear') {
      return '😱';
    }
    if (emotion === 'neutral') {
      return '😐';
    }
    if (emotion === 'sadness') {
      return '😞';
    }
    if (emotion === 'surprise') {
      return '😯';
    }
  }


  render() {
    return (
      <NavBar>
        <p>The ultimate holiday website! {this.mapEmotionToEmojii(this.props.emotion)}</p>
      </NavBar>
    );
  }
}
const mapStateToProps = createSelector(
  makeSelectEmotion(),
  (emotion) => ({ emotion })
);


export default connect(mapStateToProps)(Header);
