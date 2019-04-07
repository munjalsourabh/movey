export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_GEO_DETAILS_SUCCESS':
      console.log('geo details success');
      return {
        ...state,
        geoDetails: {countryCode: action.payload}
      }

    default:
      return state
  }
}
