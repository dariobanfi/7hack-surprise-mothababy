/*
 * ConfirmationPage
 *
 * List all the features
 */
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { requestWeather } from './actions'

import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
`

const StyledDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`

const Splitter = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Half = styled.div`
  width: 50%;
`

const WeatherIcon = styled.img`
  max-height: 75px;
`

class SummaryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const coordinates = { latitude: 48.137154, longitude: 11.576124 }
    this.props.dispatch(requestWeather(coordinates))
  }

  renderWeather(weather) {
    const { minTemp, maxTemp, weatherDescription } = weather
    return `Sneak Peek: During your stay temperatures will vary between ${minTemp} \
    and ${maxTemp} °C and you will have ${weatherDescription}.`
  }

  renderWeatherIcon(weather) {
    const {weatherIcon, weatherDescription } = weather
    return <WeatherIcon src={weatherIcon} alt={weatherDescription} />
  }

  render() {
    const { weather } = this.props
    return (
      <Wrapper>
        <Helmet
          title="Summary Page"
          meta={[
            { name: 'description', content: 'Summary page for 7hack app.' },
          ]}
        />
        <StyledDiv style={{fontSize: "1.4em"}}>Your Trip Selection was successful.</StyledDiv>
        <Splitter>
          <Half>
            <div>Departure:</div>
            <div><strong>{`18th May 2017`}</strong></div>
          </Half>
          <Half>
            <div>Time:</div>
            <div><strong>{`8 p.m.`}</strong></div>
          </Half>
        </Splitter>
        <StyledDiv>{ weather && this.renderWeatherIcon(weather) }</StyledDiv>
        <StyledDiv>{ weather && this.renderWeather(weather) }</StyledDiv>
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  const summaryState = state.get("summary")
  return {
    weather: summaryState.get("weather")
  }
}

export default connect(mapStateToProps)(SummaryPage)
