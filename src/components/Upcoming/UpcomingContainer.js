import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import React, { Component } from 'react';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';
import Typography from '@material-ui/core/Typography';
import {GridList, GridTile} from 'material-ui/GridList';
import {connect} from 'react-redux';
import Upcomings from './Upcomings'

class UpcomingContainer extends Component {

  dialogImgSrc = '';

  getCountryCode() {
    const showPosition = async (position) => {
    	const googleMap = await fetch(
    	  `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f1199e35be2e4e2db5733c987cae3fbe`);
    	const result = await googleMap.json();
      this.fetchUpcoming(result.results[0].components.country_code);
    }
    const p = navigator.geolocation.getCurrentPosition(showPosition);
  }

  componentDidMount() {
    // this.getCountryCode();
	}

  componentDidUpdate(prevProps) {
    if(!prevProps.geoDetails.geoDetails && this.props.geoDetails.geoDetails) {
      this.props.fetchUpcomingDetails(this.props.geoDetails.geoDetails.countryCode);
    }
  }

  componentWillMount() {
    this.props.fetchGeoDetails();
  }

	openDialog = (dialogData) => {
    this.dialogImgSrc = `http://image.tmdb.org/t/p/w780/${dialogData.posterPath}`;
		this.setState({dialogOpen: true})
    this.setState({dialogData: dialogData});
	}

  handleClose = () => {
    this.setState({dialogOpen: false});
  }

  render() {
    return (
      <Upcomings upcomingDetails={this.props.upcomingDetails} />
    );
  }
}

const bindActionsToDispatch = (dispatch) => {
  return {
    fetchUpcomingDetails: (countryCode) =>
        dispatch({type: 'FETCH_UPCOMING_DETAILS', payload: countryCode}),
    fetchGeoDetails: () => dispatch({type: 'FETCH_GEO_DETAILS'})
  }
};

function mapStateToProps(state) {
  debugger;
  return {
    upcomingDetails: state['upcomingDetailsReducer'],
    geoDetails: state['geoDetailsReducer']
  }
};


export default (connect(mapStateToProps, bindActionsToDispatch)(UpcomingContainer));
