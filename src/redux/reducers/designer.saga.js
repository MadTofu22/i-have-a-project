const designer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DESIGNERS':
        return action.payload;
      default:
        return state;
    }
  };

  export default designer;