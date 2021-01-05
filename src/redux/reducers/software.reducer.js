const software = (state = [], action) => {
    switch (action.type) {
      case 'SET_SOFTWARE_LIST':
        return action.payload;
      default:
        return state;
    }
  };

  export default software;