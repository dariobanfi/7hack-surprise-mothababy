import React from 'react';
import { connect } from 'react-redux';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import Img from "../../components/Header/Img";
import Waypoint from 'react-waypoint';
import Webcam from 'react-webcam';
// fetch doesn't support Blobs, sorry for jQuery -.-
import jquery from "jquery";
import { createStructuredSelector } from 'reselect';

import styled, { keyframes } from 'styled-components';


import {makeSelectEmotion, makeSelectInterests} from './selectors';
import {changeEmotion, changeInterests} from "./actions";
import {fromJS} from 'immutable';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import H1 from "../../components/H1/index";
import CenteredSection from "../HomePage/CenteredSection";
import H3 from "../../components/H3/index";
import H2 from "../../components/H2/index";
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpg'
import image5 from './5.jpg'
import image6 from './6.jpg'
import image7 from './7.jpg'
import image8 from './8.jpg'
import image9 from './9.jpg'
import image10 from './10.jpg'
import image11 from './11.jpg'
import image12 from './12.jpg'
import image13 from './13.jpg'
import image14 from './14.jpg'
import Button from "../../components/Button/index";

const StyledCard = styled ( Card ) `
  margin: 20px 0;
`
const fullWidth = {
  width: '100%'
};
const myimageKeyframes = keyframes `
  from { background-position: 0% 0 ;}
  to {background-position: 100% 0 ; }
`

const StyledCardMedia = styled ( CardMedia) `
  height: 70vh;
  animation: ${myimageKeyframes} 10s ease-in-out infinite alternate;
  background-size: cover;
  background-image: url('${props => props.image}');
`


export class Holiday extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { screenshot: null, finished: false };
  }

  componentDidMount() {
    jquery(window).scroll(() => {
      if(jquery(window).scrollTop() + jquery(window).height() == jquery(document).height()) {
        this.showSuccessScreen()
      }
    });
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
        <StyledCard key={index}>
          <StyledCardMedia image={metadataImg.img}>
        </StyledCardMedia>
        <Waypoint
            onEnter={(evt) => this.takeScreenShot(metadataImg)}
          />
        </StyledCard>
      );
    });
  }

  takeScreenShot(visibleItem) {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({screenshot: screenshot});
    if (!screenshot) {
      return;
    }
    console.log('We took your photo while looking at', visibleItem);
    const blob = this.makeBlob(screenshot);
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
      if(data.length < 1)
        return
        
      const emotions = fromJS(data[0].scores);
      console.log('This is your reaction: ', emotions.toJS());
      const emotion = emotions.keyOf(emotions.max());
      that.props.onChangeEmotion(emotion);

      visibleItem.tags.map((tag) => {
        const interestsObj = {
          interestName: tag,
          interestVal: emotions.get('happiness')
        };
        that.props.onChangeInterests(interestsObj);
      });
      console.log('Those are your interests: ', that.props.interests.toJS());
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
      // { img: image1, tags: ['nature', 'exotic' ]},
      { img: image2, tags: ['nature']},
      { img: image3, tags: ['beach']},
      { img: image4, tags: ['party', 'city']},
      { img: image5, tags: ['exotic']},
      // { img: image6, tags: ['beach']},
      { img: image7, tags: ['culture']},
      // { img: image8, tags: ['culture']},
      // { img: image9, tags: ['beach']},
      { img: image10, tags: ['city']},
      { img: image11, tags: ['party']},
      { img: image12, tags: ['exotic']},
      { img: image13, tags: ['city']},
      { img: image14, tags: ['city']},
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

      </CenteredSection>
    )
  }

  renderFinishedScreen() {
    console.log('The category the user would like to see is: ', this.props.interests.keyOf(this.props.interests.max()));
    console.log('Booking from weg.de: ', this.props.interests.keyOf(this.props.interests.max()));
    this.props.onChangeEmotion(null);
    return (
    <div>
      <p style={{height: 44}} />
      <CenteredSection>
        <H1>Thanks for making stupid faces at the camera!</H1>
        <H2>
          Now choose your price range
        </H2>
        <Button href='confirmation'>max 100 €</Button>
        <Button href='confirmation'>max 200 €</Button>
        <Button href='confirmation'>max 300 €</Button>
      </CenteredSection>
    </div>
    );
  }

  render() {
    return (
      <div style={fullWidth}>
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
