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

const Teaser = styled.div`
  font-size: 1.2em;
  margin-bottom: 30px;
  margin-top: 30px;
`

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

const ProductImage = styled.img`
  display: block;
  width: 100px;
`

class ConfirmationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    //const interest = this.props.interests.keyOf(this.props.interests.max())
    const interest = "beach"
    if (!interest) {
      return
    }
    const occasion = this.mapInterestToOccasion(interest)
    console.log('Requesting clothes for ', occasion)
    this.props.dispatch(requestProducts(occasion))

    const coordinates = { latitude: 48.137154, longitude: 11.576124}
    this.props.dispatch(requestWeather(coordinates))
  }

  mapInterestToOccasion(interest) {
    const interestToOccasionMap = {
      nature: 4022, // Freizeit
      exotic: 4014, //Sommer,
      beach: 4007, // Strand
      party: 4003, // Party
      city: 4004 // Büro
    };
    return interestToOccasionMap[interest];
  };

  renderProducts(products) {
    if (!products) {
      return;
    }
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
    console.log(this.props)
    const { tops, pants, shoes, weather } = this.props
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
            <Teaser>
              { weather && this.renderWeather(weather) }
              &nbsp;We also bought these clothes for you, can you guess where you will go?
            </Teaser>
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
    tops: confirmationState.get("tops"),
    pants: confirmationState.get("pants"),
    shoes: confirmationState.get("shoes"),
    weather: confirmationState.get("weather"),
    interests: state.get("holiday").get("interests"),
  }
}

export default connect(mapStateToProps)(ConfirmationPage)
