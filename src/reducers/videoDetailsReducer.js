export default (state = {}, action) => {
  switch (action.type) {
    case 'VIDEO_DETAILS':
      // state.trailer = {};
      return {
        ...state,
        trailer: action.payload
      }
      // state.trailer = action.payload;
      // debugger;
      // return state;
    default:
      return state
  }
}
