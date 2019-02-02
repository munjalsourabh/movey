export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_LANGUAGE':
      state.languageMap = action.payload;
      return state;
    default:
      return state
  }
}
