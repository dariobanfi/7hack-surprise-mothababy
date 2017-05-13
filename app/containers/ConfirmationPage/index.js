/*
 * ConfirmationPage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import { requestProducts, requestWeather } from './actions'

import styled from 'styled-components'
import CenteredSection from "../HomePage/CenteredSection";
import H1 from "../../components/H1/index";
import H2 from "../../components/H2/index";


const Wrapper = styled.div`
  margin: 70px auto;
  padding: 0 20px 0 20px;
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
    this.props.dispatch(requestProducts(summerOccasion));
    const coordinates = { latitude: 48.137154, longitude: 11.576124}
    this.props.dispatch(requestWeather(coordinates))
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

  renderWeather(weather) {
    const { minTemp, maxTemp, weatherCondition } = weather
    return `Sneak Peek: During your stay temperatures will vary between ${minTemp} \
    and ${maxTemp} °C and you will have ${weatherCondition}.`
  }

  render() {
    const { tops, pants, shoes, weather } = this.props
    console.log(weather)
    return (
      <div>
        <Helmet
          title="Confirmation Page"
          meta={[
            { name: 'description', content: 'Confirmation app for 7hack app.' },
          ]}
        />
        <Wrapper>
          <CenteredSection>
            <H1>We choose a destination for you! 👻</H1>
            <div>{ weather && this.renderWeather(weather) }</div>
            <H2>We bought those clothes for you, can you guess where you will go?.</H2>
            <Products>
              { this.renderProducts(tops) }
            </Products>
            <Products>
              { this.renderProducts(pants) }
            </Products>
            <Products>
              { this.renderProducts(shoes) }
            </Products>
          </CenteredSection>
        </Wrapper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const confirmationState = state.get("confirmation")
  return {
    //stateString: JSON.stringify(state),
    tops: confirmationState.get("tops"),
    pants: confirmationState.get("pants"),
    shoes: confirmationState.get("shoes"),
    weather: confirmationState.get("weather")
  }
}

export default connect(mapStateToProps)(ConfirmationPage)
