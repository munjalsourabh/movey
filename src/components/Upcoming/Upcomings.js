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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  base: {
  	display: 'flex',
  	flex: 0.9,
  	justifyContent: 'space-around',
  },
  dialog: {
    overflowY: 'auto'
  },
  root: {
    display: 'flex',
    flex: 0.9,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '26.25%', // 16:9

  },
};

class Upcomings extends Component {

  state = {
    country: 'in',
    error: null,
    isLoaded: false,
    movies: [],
    dialogOpen: false,
    dialogData: {}
  };

  dialogImgSrc = '';

	openDialog = (dialogData) => {
    this.dialogImgSrc = `http://image.tmdb.org/t/p/w780/${dialogData.posterPath}`;
		this.setState({dialogOpen: true})
    this.setState({dialogData: dialogData});
	}

  handleClose = () => {
    this.setState({dialogOpen: false});
  }

  // componentDidUpdate(prevProps) {
  //   if(!prevProps.countryCode && this.props.countryCode) {
  //     this.props.fetchUpcomingDetails(this.props.geoDetails.geoDetails.countryCode);
  //   }
  // }
  updateUpcoming = (event) => {
    this.props.updateUpcoming(event.target.value)
  }

  render() {
    return (
      <div>
        <div style={styles.base}>
          <div>
            <Dialog
                className="detail-dialog"
                disableEscapeKeyDown={false}
                fullScreen={true}
                open={this.state.dialogOpen}
                onRequestClose={this.handleClose}
              >
                <div style={styles.dialog} className="detail-card">
                  <Card style={styles.card}>
                    <CardMedia
                      style={styles.media}
                      image={`http://image.tmdb.org/t/p/w780/${this.state.dialogData.backdrop_path}`}
                      title={this.state.dialogData.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        Movie Information
                      </Typography>
                      <Typography component="span">
                        <span>
                          <h4>Overview</h4>
                          <span>{this.state.dialogData.overview}</span>
                          <h4>Release Data</h4>
                          <span>{this.state.dialogData.release_date}</span>
                        </span>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary"
                              onClick={this.handleClose}>
                        Close
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </Dialog>
            </div>
          <div style={styles.root}>
          {this.props.upcomingDetails.upcoming && this.props.upcomingDetails.upcoming.length &&
            (<GridList
              cellHeight={400}
              cols={3}
              >
              <Subheader className="upcoming-movies">
                <span>Upcoming Movies</span>
                <Select
                    className="country-selector"
                    value={this.props.countryCode}
                    onChange={this.updateUpcoming}
                  >
                    <MenuItem value="">
                      <em>Select Country</em>
                    </MenuItem>
                    <MenuItem value={'in'}>India</MenuItem>
                    <MenuItem value={'us'}>USA</MenuItem>
                    <MenuItem value={'gb'}>Great Britain</MenuItem>
                </Select>
              </Subheader>
              {this.props.upcomingDetails.upcoming && this.props.upcomingDetails.upcoming.length && this.props.upcomingDetails.upcoming.map((tile) => (
                <GridTile
                  key={tile.id}
                  title={tile.original_title}
                  subtitle={<span><b>{tile.title}</b></span>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                  onClick={this.openDialog.bind(this, tile)}
                >
                  <img src={`http://image.tmdb.org/t/p/w780//${tile.poster_path}`}  alt=""/>
                </GridTile>
              ))}
            </GridList>)}
          </div>
         </div>
      </div>
    );
  }
}

export default Upcomings;
