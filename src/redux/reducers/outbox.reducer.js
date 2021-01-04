const outbox= (state = {}, action) => {
    switch (action.type) {
      case 'SET_OUTBOX':
        return action.payload;
      default:
        return state;
    }
  };

  export default outbox;
