const managerTeam = (state = [], action) => {
    switch (action.type) {
        case 'SET_MANAGER_TEAM':
            return action.payload;
      default:
        return state;
    }
  };

  export default managerTeam;