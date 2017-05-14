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
import { makeSelectReactions } from './selectors'
import H1 from "../../components/H1/index";
import * as jquery from "jquery";
import H2 from "../../components/H2/index";

export const CITIES = [
  "Amsterdam", "Barcelona", "Budapest", "Edinburgh", "Ibiza",
  "Istanbul", "Kopenhagen", "London", "Madrid", "Paris",
  "Prag", "Rom", "Split", "Stockholm", "Tallinn",
  "Zagreb", "Ancona", "Athen", "Berlin", "Wien",
]

export const CITY_IDS = [
  1290, 1504, 1271, 800, 129,
  147, 687, 1267, 935, 883,
  1212, 433, 1326, 1306, 473,
  90, 77, 30, 618, 701
]

export const RATINGS = [
  [35,	4,	22,	4,	30,	4],
  [29,	19,	16,	6,	26,	3],
  [39,	4,	17,	4,	26,	9],
  [23,	4,	19,	23,	23,	8],
  [28,	28,	13,	22,	3,	6],
  [22,	6,	22,	6,	25,	19],
  [19,	13,	16,	22,	19,	13],
  [30,	4,	26,	4,	33,	4],
  [23,	4,	31,	12,	27,	4],
  [25,	4,	32,	4,	32,	4],
  [32,	4,	28,	4,	28,	4],
  [21,	3,	31,	14,	28,	3],
  [19,	31,	8,	19,	12,	12],
  [16,	13,	19,	26,	16,	10],
  [21,	4,	14,	29,	14,	18],
  [21,	4,	18,	25,	18,	14],
  [9,	35,	17,	26,	9,	4],
  [14,	3,	31,	17,	24,	10],
  [32,	4,	29,	4,	29,	4],
  [25,	4,	29,	14,	25,	4]
]

export const PICTURE_LABELS = ["Party", "Beach", "Kultur", "Natur", "Big City", "exotic"]

export const PICTURES = [
  [0,	3,	3,	9,	0,	5], //2
  [1,	9,	0,	4,	0,	7], //3
  [9,	3,	0,	0,	4,	0], //4
  [0,	2,	3,	3,	3,	9], //5
  [0,	0,	7,	3,	5,	1], //7
  // [4,	1,	7,	2,	6,	1], //10
  [8,	2,	3,	2,	6,	1], //11
  [2,	3,	7,	6,	2,	9], //12
  // [0,	0,	9,	0,	6,	0], //13
  [6,	0,	6,	1,	9,	0]  //14
]

function  matchFeelings(feelings) {
  var result = [0, 0, 0, 0, 0, 0]
  for (var i = 0; i < PICTURES.length; i++) {
    for (var j = 0; j < result.length; j++) {
      result[j] = result[j] + feelings[i] * PICTURES[i][j]
    }
  }

  var sum = result.reduce(function(acc, val) {
    return acc + val
  }, 0)

  var normalized = result.map(elem => elem / sum * 100)

  return normalized
}

function getBestCityMatch(normalizedFeelingsMatch) {
  var bestMatch = {
    'id': -1,
    'matchValue': 100000
  }

  for(var i = 0; i < RATINGS.length; i++) {
    var matchVal = calculateEuclidianDistance(normalizedFeelingsMatch, RATINGS[i]);

    if(matchVal < bestMatch.matchValue) {
      bestMatch.id = i
      bestMatch.matchValue = matchVal
    }
  }

  return bestMatch
}

function calculateEuclidianDistance(vec1, vec2) {
  var result = 0
  for(var i = 0; i < vec1.length; i++) {
    result += Math.pow(vec1[i] - vec2[i], 2)
  }
  return Math.sqrt(result)
}


class Destination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {hotel: null, hotelType: null};
  }

  componentWillMount() {
    const {destination, reactions} = this.props

    // const reactions = [2,0,1,0,2,1,2,2,1,2]
    console.log("reactions: " + reactions)
    var bckenP_indicator = matchFeelings(reactions);
    var dest_id = getBestCityMatch(bckenP_indicator)
    console.log(dest_id)
    const city = CITIES[dest_id.id];
    console.log("Your destination will be: " + city);
    jquery.get(`http://wegde.instigator.io/weg.de/v1/products?apikey=7Hack%212017&channel=PACKAGE&region=${dest_id.id}`).
    done((data) => {
      console.log('We booked from you at:', data.response.bestRatedHotel.comvelHotel.hotelName);
      this.setState({hotel: data.response.bestRatedHotel.comvelHotel.hotelName})
      console.log('Your room will be:', data.response.bestRatedHotel.roomType.name);
      this.setState({hotelType: data.response.bestRatedHotel.roomType.name})
    })
      .fail(function() {console.log("error");});


    this.props.onPickDestination(CITY_IDS[dest_id.id])
  }

  render() {
    const {destination, reactions} = this.props;
    return (
      <div>
        <H1>We chose an amazing hotel for you!</H1>
        <p>It's supposed to be a surpise, but for this Hackaton we will tell you:</p>
        <H2>{this.state.hotel}</H2>
        <H2>{this.state.hotelType}</H2>
        <Button href='confirmation'>Continue</Button>
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
    onPickDestination: (region) => dispatch(pickDestination(region)),
  };
}

const mapStateToProps = function(state) {
  return {
    destination: state.get("destination"),
    reactions: state.get("holiday").get("reactions").toJS()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
