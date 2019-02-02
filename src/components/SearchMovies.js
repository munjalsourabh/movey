import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import store from './../store';
import { withRouter } from "react-router-dom";

const movieOptionsStyle = {
  overflow: 'auto'
}

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(store, suggestion, { query, isHighlighted }) {
  this.suggestionOnkeyPress = suggestion;
  const matches = match(suggestion.original_title, query);
  const completeTitle = suggestion.original_title === suggestion.title ?
      suggestion.original_title :
      `${suggestion.original_title} (${suggestion.title})`;
   const parts = parse(completeTitle, matches);
   const languageMap = store.getState()['languageReducer']['languageMap'];
   const language = languageMap[suggestion.original_language]
   return (
     <MenuItem selected={isHighlighted} component="div"
              style={movieOptionsStyle} className="select-movie"
              key={suggestion.original_title}
              onFocus={() => {console.log('focussed')}}
              onClick={() => {this.setSelectedValue(suggestion)}}>
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
        &nbsp;({language.english_name})
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  return fetch("https://api.themoviedb.org/3/search/movie?api_key=6d327dfc65804feb593492f59fdabaca&language=en-US&query=" + value + "&page=1&include_adult=false")
    .then(
      (result) => {
        return result.json();
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

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight: 250,
    overflow: 'auto'
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class SearchMovies extends React.Component {

  suggestionOnkeyPress = null;

  state = {
    value: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then(response => {
      this.setState({
        suggestions: response.results,
      });
    })
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue , oldValue }) => {
    console.log('handle change called');
    if (newValue !== undefined) {
      this.setState({
        value: newValue,
      });
    } else if (this.suggestionOnkeyPress) {
      this.setState({
        value: this.suggestionOnkeyPress.title
      });
      store.dispatch({type: 'FETCH_VIDEO_DETAILS', payload: this.suggestionOnkeyPress.id});

      store.dispatch({type: 'CHANGE_SELECTED_ENTITY', payload: this.suggestionOnkeyPress});
      this.props.history.push('/details');
    }
  };

  handleKeyPress = (event, suggestion) => {
    if (event.charCode === 13) {
      console.log('suggestion', suggestion);
    }
  }

  setSelectedValue = (suggestion) => {
    this.setState({
      value: suggestion.original_title,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="search-container">
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion.bind(this, store)}
          className="filmi"
          inputProps={{
            classes,
            placeholder: 'Search a movie',
            value: this.state.value,
            onChange: this.handleChange.bind(this),
          }}
        />
      </div>
    );
  }
}

SearchMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SearchMovies));
