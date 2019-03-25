export default (state = {}, action) => {
  switch (action.type) {
    case 'UPCOMING_DETAILS':
      // state.trailer = {};
      return {
        ...state,
        upcoming: action.payload.results
      }
      // state.trailer = action.payload;
      // debugger;
      // return state;
    default:
      return state
  }
}
