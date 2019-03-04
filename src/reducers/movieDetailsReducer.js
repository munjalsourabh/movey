export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_VIDEO_DETAILS':
      return {
        ...state,
        movieDetails: action.payload
      }
      // state.movieDetails = action.payload;
      // return state;
    default:
      return state
  }
}
