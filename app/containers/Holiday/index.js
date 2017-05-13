import React from 'react';
import { connect } from 'react-redux';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import Img from "../../components/Header/Img";
import Waypoint from 'react-waypoint';
import Webcam from 'react-webcam';
// fetch doesn't support Blobs, sorry for jQuery -.-
import jquery from "jquery";
import { createSelector } from 'reselect';

import { makeSelectEmotion } from './selectors';
import {changeEmotion} from "./actions";
import {fromJS} from 'immutable';
import H1 from "../../components/H1/index";
import CenteredSection from "../HomePage/CenteredSection";
import H3 from "../../components/H3/index";

export class Holiday extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { screenshot: null, finished: false };
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
      { img: 'https://www.placecage.com/g/400/500', tags: ['city', 'cafe']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['mountain']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['outdoors']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['party', 'beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['culture']}
    ];

    return imagesWithMetadata.map((metadataImg, index) => {
      return (
        <div key={index}>
          <Img src={metadataImg.img}  />
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
    if (!screenshot) {
      return;
    }
    const blob = this.makeBlob(screenshot);
    console.log(blob);

    this.sendBlob(blob);

  }

  sendBlob(blob) {
    const that = this;
  jquery.ajax({
      url: '  https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
      type: 'POST',
      headers: {"Ocp-Apim-Subscription-Key": "9bba44af817a40de86c67e196e44075d"},
      processData: false,
      contentType: 'application/octet-stream',
      data: blob
    })
    .done((data) => {
      const emotions = fromJS(data[0].scores);
      console.log(emotions.toJS());
      const emotion = emotions.keyOf(emotions.max());
      that.props.onChangeEmotion(emotion)
    })
    .fail(function() {console.log("error");});
  }

  showSuccessScreen() {
    setTimeout(() => {
      this.setState({finished: true});
    }, 3000)
  }

  renderImageEmotions() {
    return (
      <div>
        {/*Hiding it because noone wants to see your ugly face*/}
        <div style={{ position: 'absolute', top: '-1000px'}}>
          <Webcam screenshotFormat='image/jpeg' ref='webcam' width="1000" height="1000"/>
        </div>
        {this.printImages()}
        <Waypoint
          onEnter={(evt) => this.showSuccessScreen()} />
      </div>
    )
  }

  renderFinishedScreen() {
    this.props.onChangeEmotion(null);
    return (
    <div>
      <p style={{height: 44}} />
      <CenteredSection>
        <H1>Thanks for making stupid faces at the camera!</H1>
        <H3>We booked a surprise holiday for you!</H3>
      </CenteredSection>
    </div>
    );
  }

  render() {
    return (
      <div>
        {!this.state.finished ? this.renderImageEmotions() : this.renderFinishedScreen()}
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmotion: (emotion) => dispatch(changeEmotion(emotion)),
  };
}


const mapStateToProps = createSelector(
  makeSelectEmotion(),
  (emotion) => ({ emotion })
);

export default connect(mapStateToProps, mapDispatchToProps)(Holiday);
