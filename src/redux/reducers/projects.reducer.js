const projects = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DESIGNER_PROJECTS':
        return action.payload;
      case 'SET_MANAGER_PROJECTS':
        let projects = []
        for (const project of action.payload) {
          project['start'] = project.start.slice(0,10)
          project['due_date'] = project.due_date.slice(0,10)
          projects.push(project)
       }
        return projects;
      default:
        return state;
    }
  };

  export default projects;