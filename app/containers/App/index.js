/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  /*min-height: 100%;*/
  padding: 0 0px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  padding: 1em;
  width: 100%;
`

export function App(props) {
  return (
    <MuiThemeProvider>
      <AppWrapper>

        <Helmet
          titleTemplate="%s - Surprise Holiday"
          defaultTitle="Surprise Holiday"
          meta={[
            { name: 'description', content: 'A surprise holiday which based on your feelings' },
          ]}
        />
        <AppBar />
        <Content>
          {React.Children.toArray(props.children)}
        </Content>
        {/*<Footer />*/}
      </AppWrapper>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
