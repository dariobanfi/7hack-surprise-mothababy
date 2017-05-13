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


const Wrapper = styled.div`
  margin: 70px auto;
  max-width: 1000px;
`

const Products = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
`

const Product = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`

const ProductName = styled.div`
  font-size: 1.2em;
  padding: 10px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProductImage = styled.img`
  display: block;
  width: 100px;
`

class ConfirmationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const summerOccasion = 4007 // 4008
    this.props.dispatch(requestProducts(summerOccasion))
  }

  renderProducts(products) {
    return products.slice(0, 3).map((value) => {
      const id = value.id
      const name = value.name
      const imageUrl = value.images[0].url
      return (
        <Product key={id}>
          <ProductImage src={imageUrl} alt={name}/>
        </Product>
      )
    })
  }

  render() {
    const { tops, pants, shoes } = this.props
    return (
      <div>
        <Helmet
          title="Confirmation Page"
          meta={[
            { name: 'description', content: 'Confirmation app for 7hack app.' },
          ]}
        />
        <Wrapper>
          <div>
            <div>We choose a destination for you!</div>
            <div>Sneak Peak: During your stay the weather will mostly sunny.</div>
          </div>
          <Products>
            { this.renderProducts(tops) }
          </Products>
          <Products>
            { this.renderProducts(pants) }
          </Products>
          <Products>
            { this.renderProducts(shoes) }
          </Products>
        </Wrapper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    //stateString: JSON.stringify(state),
    tops: state.get("confirmation").get("tops"),
    pants: state.get("confirmation").get("pants"),
    shoes: state.get("confirmation").get("shoes")
  }
}

export default connect(mapStateToProps)(ConfirmationPage)
