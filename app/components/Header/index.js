import React from 'react';

import NavBar from './NavBar';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <NavBar>
        <p>The ultimate holiday website!</p>
      </NavBar>
    );
  }
}

export default Header;
