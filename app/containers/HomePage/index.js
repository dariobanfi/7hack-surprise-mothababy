/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';
import H6 from 'components/H6';
import CenteredSection from './CenteredSection';
import Webcam from 'react-webcam';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import Button from "../../components/Button/index";
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import background from 'strand sonnenaufgang.jpg';


const ProductName = styled.p`
  font-size: 1.2em;
  padding: 10px;
  width: 200px;
  text-align: center;
`

const style = {
  margin: "auto",
  marginTop: '10em'
};
const rightstyle = {
  'textAlign': 'right',
  'fontSize': '1.25em'

};

import jquery from "jquery";
import {Link} from "react-router";

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  // Disabled because Microsft API doesn't work
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.takeScreenShot();
  //   },3000);
  // }

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


  takeScreenShot() {
    if (!this.refs.webcam) {
      return;
    }
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({screenshot: screenshot});
    if (!screenshot) {
      return;
    }
    const blob = this.makeBlob(screenshot);
    this.sendBlob(blob);

  }

  sendBlob(blob) {
    const that = this;
    var params = {
      // Request parameters
      "returnFaceId": "true",
      "returnFaceLandmarks": "false",
      "returnFaceAttributes": "{string}",
    };
    jquery.ajax({
      url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + jquery.param(params),
      type: 'POST',
      headers: {"Ocp-Apim-Subscription-Key": "45f1449cc8bc4a438fd0f404b322591c"},
      processData: false,
      contentType: 'application/octet-stream',
      data: blob
    })
      .done((data) => {
        console.log(data);
      })
      .fail(function() {console.log("error");});
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    document.body.style.backgroundImage = `url(${background})`
    document.querySelector("#app").style.backgroundColor = 'transparent'
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]} />
        <div>
          <CenteredSection>
            <H1>
              Discover Yourself
            </H1>
            <p style={rightstyle} >
              get inspired by <br/> destinations & fashion
            </p>

            <p style={rightstyle} ><Webcam ref='webcam' width="300" height="300"/></p>
            <p style={rightstyle} >
              Show your emotions while looking at those photos, we will arrange you a surprise Holiday!
            </p>
            {/*<Button >Start</Button>*/}
            <Link to="holiday"><RaisedButton label="Start" fullWidth={true} primary={true} style={style} /></Link>
          </CenteredSection>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
