import { call, put } from 'redux-saga/effects'
import store from './../store';


export const api = (url) => fetch(url).then(response => response.json())

export function* fetchVideoDetails(action) {
  console.log('action', action);
   try {
     console.log(action);
      const videoDetails = yield call(api, `https://api.themoviedb.org/3/movie/${action.payload}/videos?api_key=6d327dfc65804feb593492f59fdabaca&language=en-US`);
      yield put({type: 'VIDEO_DETAILS', payload: videoDetails});
    console.log
   } catch (e) {
       console.log(e)
   }
}
