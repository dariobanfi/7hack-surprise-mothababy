import { injectGlobal } from 'styled-components';
import background from 'strand sonnenaufgang.jpg';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #FDF9F6;
    background-image: url(${background});
    padding: 1em;
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
