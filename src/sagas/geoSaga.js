import { call, put, takeEvery } from 'redux-saga/effects'

const api = (url) => fetch(url).then(response => response.json())

function* fetchGeoDetails(action) {
    const pos = yield getPosition();
    try {
      console.log(action);
      // yield fetchCoordinates(position).next().next()
      const geoDetails = yield call(api, `http://api.geonames.org/countryCodeJSON?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&username=sourabhmunjal`);
      // const result =  await upcomingDetails.json();
      debugger;
      // const a = fetchCoordinates(result);
      // console.log(a);
      // a.next();
      yield put({type:'FETCH_GEO_DETAILS_SUCCESS', payload: geoDetails})

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
