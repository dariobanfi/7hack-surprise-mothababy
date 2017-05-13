/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'components/Button';
import { pickDestination } from '../App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';


export class Destination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props)
    return (
      <div>
        <img src="https://www.placecage.com/g/800/600"></img>
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

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
