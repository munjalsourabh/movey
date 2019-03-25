import { call, put, takeEvery } from 'redux-saga/effects'

const api = (url) => fetch(url).then(response => response.json())

function* fetchUpcomingDetails(action) {
  console.log('action', action);
   try {
     console.log(action);
      const upcomingDetails = yield call(api,
          `https://api.themoviedb.org/3/movie/upcoming?region=${action.payload}&api_key=6d327dfc65804feb593492f59fdabaca`);

      yield put({type: 'UPCOMING_DETAILS', payload: upcomingDetails});
    // console.log
   } catch (e) {
       console.log(e)
   }
}

function* upcomingSaga() {
  console.log('upcoming saga called');
  yield takeEvery('FETCH_UPCOMING_DETAILS', fetchUpcomingDetails);
}

export default upcomingSaga;
