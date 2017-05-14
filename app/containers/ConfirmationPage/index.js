/*
 * ConfirmationPage
 *
 * List all the features
 */
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { requestProducts, requestWeather } from './actions'

import styled, { keyframes } from 'styled-components'
import CenteredSection from "../HomePage/CenteredSection"
import H1 from "../../components/H1/index"
import H2 from "../../components/H2/index"

import {GridList, GridTile} from 'material-ui/GridList'

import jquery from "jquery";

const Wrapper = styled.div`
  margin: 30px auto;
  padding: 0 20px 0 20px;
  max-width: 1000px;
`

const Gallery = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 50px auto;
`

const galleryFade = (index) =>  keyframes`
  0% { opacity: 0; }
  ${index * 8.33333333}% { opacity: 0; }
  ${index * 8.33333333 + 8.33333333}% { opacity: 1; }
  ${index * 8.33333333 + 2 * 8.33333333}% { opacity: 0; }
  100% { opacity: 0 }
`

const makeGalleryImage = (index) => styled.img`
  position: absolute;
  max-width: 100%;
  opacity: 0;

  animation: ${galleryFade(index)} 40s linear infinite;
`

const Brands = styled.div`
  display: flex;
  justify-content: space-around;
`

const Brand = styled.img`
  display: block;
  margin-left: 10px;
  margin-right: 10px;
  max-height: 35px;
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

  renderGalleryImages(products) {
    return products.map((value, index) => {
      const { id, name } = value
      const imageUrl = value.images[0].url
      const GalleryImage = makeGalleryImage(index)
      return (
        <GalleryImage key={id} src={imageUrl} alt={name} />
      )
    })
  }

  renderBrands(products) {
    const brands = _.filter(_.uniqBy(products.map((value) => value.brand), (e) => e.id), (e) => _.isString(e.logo)).slice(0,3)
    return brands.map((value) => {
      const { id, name, logo } = value
      return <Brand key={id} alt={name} src={logo} />
    })
  }

  renderWeather(weather) {
    const { minTemp, maxTemp, weatherCondition } = weather
    return `Sneak Peek: During your stay temperatures will vary between ${minTemp} \
    and ${maxTemp} °C and you will have ${weatherCondition}.`
  }

  render() {
    const { tops, pants, shoes, weather } = this.props
    const products = [
      ...tops.slice(0,4),
      ...pants.slice(0,4),
      ...shoes.slice(0,4)
    ]
    return (
      <div>
        <Helmet
          title="Confirmation Page"
          meta={[
            { name: 'description', content: 'Confirmation app for 7hack app.' },
          ]}
        />
        <Wrapper>
          <p>A package with suitable clothes will be delivered and available at your hotel upon your arrival:</p>
          <Gallery className="gallery">
            { this.renderGalleryImages(products)}
          </Gallery>
          <Brands>
            { this.renderBrands(products) }
          </Brands>
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
