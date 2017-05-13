/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'components/Button';
import { pickDestination } from './actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';


class Destination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  render() {
    const {destination} = this.props
    console.log(destination)
    return (
      <div>
        <img src="https://www.placecage.com/g/800/600"></img>
        <p>{ destination.get("response") && JSON.stringify(destination.get("response")) }</p>
        <Button onClick={this.props.onSubmitForm}>yo</Button>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(pickDestination());
    },
  };
}

const mapStateToProps = function(state) {
  return {
    destination: state.get("destination")
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
