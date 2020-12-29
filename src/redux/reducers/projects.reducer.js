const projects = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DESIGNER_PROJECTS':
        return action.payload;
      case 'SET_MANAGER_PROJECTS':
        return action.payload;
      default:
        return state;
    }
  };

  export default projects;