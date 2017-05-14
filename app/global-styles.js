import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: #222222;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: white;
    background-size: cover;
    min-height: 100%;
    min-width: 100%;
    display: flex;
  }

  #app>div {
    width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;
