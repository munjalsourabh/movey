import { takeEvery } from 'redux-saga/effects'

import { fetchVideoDetails } from '../actions'

function* mySaga() {
  console.log('my saga called');
  yield takeEvery('FETCH_VIDEO_DETAILS', fetchVideoDetails);
}

export default mySaga;
