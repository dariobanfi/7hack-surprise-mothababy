/*
 * ConfirmationPage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { requestProducts } from './actions'

import H1 from 'components/H1';

class ConfirmationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.props.dispatch(requestProducts(4008))
  }

  render() {
    return (
      <div>
        <Helmet
          title="Confirmation Page"
          meta={[
            { name: 'description', content: 'Confirmation app for 7hack app.' },
          ]}
        />
        <div>
          {this.props.products}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: JSON.stringify(state)
  }
}

export default connect(mapStateToProps)(ConfirmationPage)
