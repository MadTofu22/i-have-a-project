const adminUserList = (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_USERS_LIST_IN_STORE':
        console.log("in action.payload for admin reducer", action.payload);
        return action.payload;
      default:
        return state;
    }
  };

  export default adminUserList;