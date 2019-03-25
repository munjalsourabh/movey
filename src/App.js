import './App.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MovieDetails from './components/MovieDetails';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SearchMovies from './components/SearchMovies';
import store from  './store';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Upcoming from './components/Upcoming';
import UpcomingContainer from './components/Upcoming/UpcomingContainer';

UpcomingContainer

const elementStyles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 8,
  },
}


class App extends Component {

  constructor(args) {
    super(...args)
    this.openDrawer = this.openDrawer.bind(this)
  }
  state = {
    drawerOpen: false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };

  openDrawer() {
    this.setState({
      drawerOpen: true
    })
  }

  propagateMovieSelection() {

  }

  componentWillMount() {
    fetch("https://api.themoviedb.org/3/configuration/languages?api_key=6d327dfc65804feb593492f59fdabaca")
      .then(
        (result) => {
          result.json().then((response) => {
            const languageAcronymMap = {};
            response.forEach((res) => {
              languageAcronymMap[res.iso_639_1] = res;
            });
            store.dispatch({type: 'ADD_LANGUAGE', payload: languageAcronymMap});
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu" onClick={this.openDrawer}>
                <MenuIcon />
              </IconButton>
              <Grid container justify="center" >
                <Grid item xs={12}>
                  <Grid container className={elementStyles.demo} >
                     <Grid item xs={3}>
                       <Typography variant="title" color="inherit">
                         Frames per second
                       </Typography>
                     </Grid>
                     <Grid item xs={6}>
                       <SearchMovies select-movie={this.propagateMovieSelection}></SearchMovies>
                     </Grid>
                   </Grid>
                </Grid>
              </Grid>
          </Toolbar>

          </AppBar>
          <Drawer open={this.state.drawerOpen} onClose={() => {this.setState({drawerOpen: false})}}>
            <div
              tabIndex={0}
              role="button"
              onMouseEnter={this.toggleDrawer.bind(this)}
            >
              <div className="main-sidebar">
                <List component="nav">
                  <ListItem button>
                    <ListItemIcon>
                      <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search Movies" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItem>
                </List>
                <Divider />
              </div>
            </div>
          </Drawer>
          <Provider store={store}>
            <Switch>
              <Route exact path='/' component={Upcoming}/>
              <Route exact path='/search' component={SearchMovies}/>
              <Route exact path='/details' component={MovieDetails}/>
              <Route exact path='/upcoming' component={UpcomingContainer}/>
            </Switch>
          </Provider>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
