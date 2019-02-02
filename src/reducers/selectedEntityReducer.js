export default (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_ENTITY':
      state.selectedEntity = action.payload;
      return state;
    default:
      return state
  }
}
