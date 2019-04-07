import { call, put, takeEvery } from 'redux-saga/effects'

const api = (url) => fetch(url).then(response => response.json())

function* fetchGeoDetails(action) {
    const pos = yield getPosition();
    try {
      const geoDetails = yield call(api, `https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=f1199e35be2e4e2db5733c987cae3fbe`);
      yield put({type:'FETCH_GEO_DETAILS_SUCCESS', payload: geoDetails.results[0].components.country_code})

    } catch (e) {
      console.log(e)
    }
  // });
}

function getPosition(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}


function* fetchCoordinates(position) {
  return yield put({type: 'FETCH_GEO_DETAILS_SUCCESS', payload: position});

}

function* upcomingSaga() {
  console.log('geo saga called');
  yield takeEvery('FETCH_GEO_DETAILS', fetchGeoDetails);
}

export default upcomingSaga;
