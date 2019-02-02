export default (state = {}, action) => {
  switch (action.type) {
    case 'VIDEO_DETAILS':
      // state.trailer = {};
      state.trailer = action.payload;
      debugger;
      return state;
    default:
      return state
  }
}
