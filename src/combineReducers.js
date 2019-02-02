import { combineReducers } from 'redux'
import languageReducer from './reducers/languageReducer';
import selectedEntityReducer from './reducers/selectedEntityReducer';
import videoDetailsReducer from './reducers/videoDetailsReducer';



export default combineReducers({
  languageReducer,
  selectedEntityReducer,
  videoDetailsReducer
})
