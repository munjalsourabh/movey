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
      // position = `${position.coords.latitude},${position.coords.longitude}`;
      // console.log('position');
      // console.log(position);
      const googleMap = await fetch(
        `http://api.geonames.org/countryCodeJSON?lat=${position.coords.latitude}&lng=${position.coords.longitude}&username=sourabhmunjal`);
      const result = await googleMap.json();
      // const addressComp = result.results.find((r) => {
      //   return r.types.indexOf('country') > -1;
      // });
      this.fetchUpcoming(result.countryCode);
    }
    const p = navigator.geolocation.getCurrentPosition(showPosition);

  }

  componentDidMount() {
    this.getCountryCode();
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
      <Upcomings upcomingDetails={this.props.upcomingDetails}
                 fetchUpcomingDetails={this.props.fetchUpcomingDetails} />
    );
  }
}

const bindActionsToDispatch = (dispatch) => {
  return {
    fetchUpcomingDetails: (countryCode) =>
        dispatch({type: 'FETCH_UPCOMING_DETAILS', payload: countryCode})
  }
};

function mapStateToProps(state) {
  debugger;
  return {
    upcomingDetails: state['upcomingDetailsReducer']
  }
};


export default (connect(mapStateToProps, bindActionsToDispatch)(UpcomingContainer));
