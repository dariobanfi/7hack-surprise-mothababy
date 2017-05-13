/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import jquery from "jquery";

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    setTimeout(() => {
      this.takeScreenShot();
    },3000);
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


  takeScreenShot() {
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

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              I am just taking up space... quite sad
            </H2>
            <H1>
              GO SOMEWHERE WITHOUT KNOWING WHERE!
            </H1>
            <H6>
              Well you should, case you suck.. look at your face
            </H6>
            <Webcam ref='webcam' width="300" height="300"/>
            <H2>
              We'll show you some cool places, just use emotions to tell us what you like and we will book an holiday for
              you and get you some cool clothes for it too!
            </H2>
            <Button href="holiday">Start</Button>
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
