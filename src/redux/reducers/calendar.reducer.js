const calendar = (state = [{
    id: 0,
    title: '',
    start: '',
    hoursToCommit: 0
  }], action) => {
    switch (action.type) {
      case 'SET_DESIGNER_EVENTS':
        return action.payload;
      default:
        return state;
    }
  };

  export default calendar;