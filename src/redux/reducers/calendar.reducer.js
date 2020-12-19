const sampleReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SAMPLE_CASE':
        return action.payload;
      default:
        return state;
    }
  };

  export default sampleReducer;