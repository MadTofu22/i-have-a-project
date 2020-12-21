const calendar = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DESIGNER_EVENTS':
        return action.payload;
      default:
        return state;
    }
  };

  export default calendar;