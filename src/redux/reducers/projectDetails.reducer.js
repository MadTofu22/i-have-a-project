const projectDetails = (state = { 
        projectDetails: {
        id: 0,
        status: 'New',
        due_date: '',
        notes: '',
        project_name: '',
        manager_id: 0,
        start: ''
    },
    designerEvents: [],
    projectDesigners: [],
}, action) => {
    switch (action.type) {
      case 'SET_PROJECT_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };

  export default projectDetails;