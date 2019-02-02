export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_VIDEO_DETAILS':
      state.movieDetails = action.payload;
      return state;
    default:
      return state
  }
}
