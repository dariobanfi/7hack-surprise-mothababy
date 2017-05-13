import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import Img from "../../components/Header/Img";
import Waypoint from 'react-waypoint';
import Webcam from 'react-webcam';


export class Holiday extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { screenshot: null };
  }

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
            onEnter={(evt) => this.takeScreenShot(metadataImg)}
          />
      </div>
      );
    });
  }

  takeScreenShot(visibleItem) {
    console.log('Took your photo while looking at', visibleItem);
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({screenshot: screenshot});
    console.log(this.state.screenshot);
  }

  render() {
    return (
      <div>
        <div style={{display: 'none'}}>
          <Webcam ref='webcam'/>
        </div>
        {this.printImages()}
      </div>
    );
  }
}

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(Holiday);
