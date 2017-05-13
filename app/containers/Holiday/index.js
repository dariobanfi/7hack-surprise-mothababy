import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import Img from "../../components/Header/Img";
import Waypoint from 'react-waypoint';
import Webcam from 'react-webcam';
// fetch doesn't support Blobs, sorry for jQuery -.-
import jquery from "jquery";


export class Holiday extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { screenshot: null };
  }

  makeBlob = function (dataURL) {
    if (!dataURL) {
      return;
    }
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

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
          <Img src={metadataImg.img}  />
          <Waypoint
            onEnter={(evt) => this.takeScreenShot(metadataImg)}
          />
          <Img src={this.state.screenshot} />
      </div>
      );
    });
  }

  takeScreenShot(visibleItem) {
    console.log('Took your photo while looking at', visibleItem);
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({screenshot: screenshot});
    if (!screenshot) {
      return;
    }
    const blob = this.makeBlob(screenshot);
    console.log(blob);

    this.sendBlob(blob);

  }

  sendBlob(blob) {
  jquery.ajax({
      url: '  https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
      type: 'POST',
      headers: {"Ocp-Apim-Subscription-Key": "9bba44af817a40de86c67e196e44075d"},
      processData: false,
      contentType: 'application/octet-stream',
      data: blob
    })
    .done(function(data) {console.log("success");})
    .fail(function() {console.log("error");});
  }

  render() {
    return (
      <div>
        {/*Hiding it because noone wants to see your ugly face*/}
        <div style={{ position: 'absolute', top: '-1000px'}}>
          <Webcam ref='webcam' width="500" height="500"/>
        </div>
        {this.printImages()}
      </div>
    );
  }
}

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(Holiday);
