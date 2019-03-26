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

class Upcoming extends Component {
  state = {
    error: null,
    isLoaded: false,
    movies: [],
    dialogOpen: false,
    dialogData: {}
  };

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

  fetchUpcoming(country) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?region=IN&api_key=6d327dfc65804feb593492f59fdabaca`)
      .then(
        (result) => {
          result.json().then((response) => {
            console.log('upcoming movies ', response);
            this.setState({
              movies: response.results
            })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    });
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
  			    <GridList
  			      cellHeight={400}
  			      cols={3}
  			      >
  			      <Subheader>Upcoming Movies</Subheader>
  			      {this.state.movies.map((tile) => (
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
  			    </GridList>
  			  </div>
  	     </div>
      </div>
    );
  }
}

export default Upcoming;
