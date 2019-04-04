import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import languageReducer from './reducers/languageReducer';
import selectedEntityReducer from './reducers/selectedEntityReducer';
import movieDetailsReducer from './reducers/movieDetailsReducer';
import videoDetailsReducer from './reducers/videoDetailsReducer';
import upcomingDetailsReducer from './reducers/upcomingDetailsReducer';
import geoDetailsReducer from './reducers/geoDetailsReducer';

import mySaga  from './sagas';
import upcomingSaga  from './sagas/upcomingSaga';
import geoSaga  from './sagas/geoSaga';


const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  languageReducer,
  selectedEntityReducer,
  movieDetailsReducer,
  videoDetailsReducer,
  upcomingDetailsReducer,
  geoDetailsReducer
});

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

function* rootSaga () {
  sagaMiddleware.run(mySaga); // saga1 can also do middleware.run(actionOne), etc.
  sagaMiddleware.run(upcomingSaga);
  sagaMiddleware.run(geoSaga);
}

sagaMiddleware.run(rootSaga);

export default store;
