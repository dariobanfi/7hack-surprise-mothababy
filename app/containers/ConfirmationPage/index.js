/*
 * ConfirmationPage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { requestProducts } from './actions'

import styled from 'styled-components'


const Products = styled.div`
  margin: 70px auto;
  max-width: 1000px;
  overflow-y: auto;
  display: flex;
`

const Product = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`

const ProductName = styled.div`
  font-size: 1.2em;
  padding: 10px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProductImage = styled.img`
  display: block;
  width: 200px;
`

class ConfirmationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function


  componentDidMount() {
    this.props.dispatch(requestProducts(4008))
  }

  renderProducts(products) {
    return products.map((value) => {
      const id = value.id
      const name = value.name
      const imageUrl = value.images[0].url
      return (
        <Product key={id}>
          <ProductName>{name}</ProductName>
          <ProductImage src={imageUrl} alt={name}/>
        </Product>
      )
    })
  }

  render() {
    const { products } = this.props
    return (
      <div>
        <Helmet
          title="Confirmation Page"
          meta={[
            { name: 'description', content: 'Confirmation app for 7hack app.' },
          ]}
        />
        <Products>
          { this.renderProducts(products) }
        </Products>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stateString: JSON.stringify(state),
    products: state.get("confirmation").get("products")
  }
}

export default connect(mapStateToProps)(ConfirmationPage)
