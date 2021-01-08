const inbox = (state = {}, action) => {
    switch (action.type) {
      case 'SET_INBOX':
        return action.payload;
      default:
        return state;
    }
  };

  export default inbox;