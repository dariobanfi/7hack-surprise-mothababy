/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import Img from "../../components/Header/Img";


export class Holiday extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Img src="https://www.placecage.com/g/400/500"></Img>
        <Img src="https://www.placecage.com/g/400/500"></Img>
        <Img src="https://www.placecage.com/g/400/500"></Img>
        <Img src="https://www.placecage.com/g/400/500"></Img>
        <Img src="https://www.placecage.com/g/400/500"></Img>
        <Img src="https://www.placecage.com/g/400/500"></Img>
        <Img src="https://www.placecage.com/g/400/500"></Img>
      </div>
    );
  }
}

Holiday.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(Holiday);
