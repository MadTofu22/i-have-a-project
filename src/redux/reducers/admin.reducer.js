const adminUserList = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_USERS_LIST_IN_STORE':
        return action.payload;
      default:
        return state;
    }
  };

  export default adminUserList;