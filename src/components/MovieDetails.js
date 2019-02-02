import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Utils from './../utils';
import store from './../store';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
  },
});

class MovieDetails extends Component {

  state = {
    videoDetails:  ''
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (this.props.status !== nextProps.status) {
      this.setState({
        status: nextProps.status
      });
    }
  }

  componentWillMount() {
    if(!this.props.entitiy.selectedEntity) {
      window.location.href = "/"
    } else {
      this.props.fetchVideoDetails(this.props.entitiy.selectedEntity.id);
    }
    // store.subscribe(() => {
    //   console.log('state val', store.getState());
    //   if (store.getState().videoDetailsReducer.selectedEntity.results[0]) {
    //     let videoUrl = `www.youtube.com/embed/${store.getState().videoDetailsReducer.selectedEntity.results[0].key}`;
    //   }
    //   this.setState({videoDetails: videoUrl};
    // })
    this.fetchVideoDetails();

  }

  componentDidMount() {
    console.log('freaking props')
    console.log(this.props.trailerDetails.trailer);
    if (this.props.trailerDetails.trailer) {
      console.log(this.state);
      this.setState({videoDetails: `//www.youtube.com/embed/${this.props.trailerDetails.trailer.results[0].key}`});
    }
  }

  componentDidUpdate() {
    console.log('update called')
    console.log(this.props.trailerDetails);
    this.fetchVideoDetails(this.props.entitiy.selectedEntity.id);

  }

  fetchVideoDetails() {
    const id = this.props.entitiy.selectedEntity.id
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=6d327dfc65804feb593492f59fdabaca&language=en-US`)
      .then(
        (result) => {
          result.json().then((response) => {
            if(response.results.length) {
              const videoDetails = response.results[0];
              videoDetails.videoUrl = `//www.youtube.com/embed/${response.results[0].key}`;
              if(this.state && this.state.videoDetails.id !== response.results[0].id) {
                this.setState({'videoDetails': videoDetails});
              }
            }
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

  componentWillReceiveProps(nextProps) {
    console.log('nextProps');
    console.log(nextProps.trailerDetails);
  }

  getTrailerUrl() {
    if (this.props.trailerDetails && this.props.trailerDetails.videoDetails &&
        this.props.trailerDetails.videoDetails.results.length > 0) {
          return `//www.youtube.com/embed/${this.props.trailerDetails.videoDetails.results[0].key}`;
    }
    return '';
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
           <Grid container spacing={24}>
             <Grid item xs={6}>
               <Table className={classes.table}>
                 <TableBody>
                   {Object.keys(this.props.entitiy.selectedEntity).map(row => {
                     return (
                       <TableRow key={row}>
                         <TableCell component="th" scope="row">
                           <span className="details-label">{Utils.getReadableFormat(row)}</span> :
                               {this.props.entitiy.selectedEntity[row]}
                         </TableCell>
                       </TableRow>
                     );
                   })}
                 </TableBody>
               </Table>
             </Grid>
             <Grid item xs={6}>
               {
                 this.state.videoDetails ?
                   (<iframe width="560" height="315"
                             src={`//www.youtube.com/embed/${this.props.trailerDetails.trailer.results[0].key}`}
                             frameBorder="0" allowFullScreen>
                     </iframe>):
                   ''
               }
             </Grid>
         </Grid>
        </Paper>
      </div>
    );
  }
}


const bindActionsToDispatch = dispatch => ({
      fetchVideoDetails: (movieId) => dispatch({type: 'FETCH_VIDEO_DETAILS', payload: movieId})
});

function mapStateToProps(state){
    return {
        entitiy: state['selectedEntityReducer'],
        language: state['languageReducer'],
        trailerDetails: state['videoDetailsReducer']
    }
}

export default withStyles(styles)(connect(
    mapStateToProps, bindActionsToDispatch)(MovieDetails));
