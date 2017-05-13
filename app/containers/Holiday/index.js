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
import Waypoint from 'react-waypoint';


export class Holiday extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  printImages() {
    const imagesWithMetadata = [
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']}
    ];

    return imagesWithMetadata.map((metadataImg, index) => {
      return (
        <div key={index}>
          <Img src={metadataImg.img} />
          <Waypoint
            onEnter={(evt) => console.log('Looking at', metadataImg.img)}
          />
      </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.printImages()}
      </div>
    );
  }
}

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(Holiday);
