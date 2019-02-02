import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import languageReducer from './reducers/languageReducer';
import selectedEntityReducer from './reducers/selectedEntityReducer';
import movieDetailsReducer from './reducers/movieDetailsReducer';
import videoDetailsReducer from './reducers/videoDetailsReducer';

import  mySaga  from './sagas';


const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  languageReducer,
  selectedEntityReducer,
  movieDetailsReducer,
  videoDetailsReducer
});

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export default store;
