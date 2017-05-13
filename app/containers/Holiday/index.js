import React from 'react';
import { connect } from 'react-redux';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import Img from "../../components/Header/Img";
import Waypoint from 'react-waypoint';
import Webcam from 'react-webcam';
// fetch doesn't support Blobs, sorry for jQuery -.-
import jquery from "jquery";
import { createStructuredSelector } from 'reselect';

import {makeSelectEmotion, makeSelectInterests} from './selectors';
import {changeEmotion, changeInterests} from "./actions";
import {fromJS} from 'immutable';
import H1 from "../../components/H1/index";
import CenteredSection from "../HomePage/CenteredSection";
import H3 from "../../components/H3/index";
import H2 from "../../components/H2/index";

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

  printImages(images) {

    return images.map((metadataImg, index) => {
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

    this.sendBlob(blob, visibleItem);

  }

  sendBlob(blob,visibleItem) {
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
      console.log('interests', that.props.interests.toJS());
      const emotion = emotions.keyOf(emotions.max());
      that.props.onChangeEmotion(emotion);

      visibleItem.tags.map((tag) => {
        const interestsObj = {
          interestName: tag,
          interestVal: emotions.get('happiness')
        };
        that.props.onChangeInterests(interestsObj);
      });
    })
    .fail(function() {console.log("error");});
  }

  showSuccessScreen() {
    setTimeout(() => {
      this.setState({finished: true});
    }, 3000)
  }

  renderImageEmotions() {

    const images = [
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['city', 'cafe']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['mountain']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['outdoors']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['party', 'beach']},
      { img: 'https://www.placecage.com/g/400/500', tags: ['culture']}
    ];


    return (
      <CenteredSection>
        <p style={{height: 44}} />
        <H2>Swipe down slowly</H2>
        <img src="http://keymarketing.com/wordpress/wp-content/themes/keymarketing/dist/img/arrowdown.svg" style={{height: '190px', paddingBottom: '10px'}}/>
        {/*Hiding it because noone wants to see your ugly face*/}
        <div style={{ position: 'absolute', top: '-1000px'}}>
          <Webcam screenshotFormat='image/jpeg' ref='webcam' width="1000" height="1000"/>
        </div>
        {this.printImages(images)}
        <Waypoint
          onEnter={(evt) => this.showSuccessScreen()} />
      </CenteredSection>
    )
  }

  renderFinishedScreen() {
    console.log('THE CATEGORY WE CHOSE IS:', this.props.interests.keyOf(this.props.interests.max()));
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
    onChangeInterests: (interestObj) => dispatch(changeInterests(interestObj)),
  };
}



const mapStateToProps = createStructuredSelector({
  emotion: makeSelectEmotion(),
  interests: makeSelectInterests()
});

export default connect(mapStateToProps, mapDispatchToProps)(Holiday);
