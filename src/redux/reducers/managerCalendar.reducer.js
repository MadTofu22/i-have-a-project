const managerCalendar = (state = [], action) => {
    switch (action.type) {
        case 'SET_MANAGER_CALENDAR':
            return action.payload;
      default:
        return state;
    }
  };

  export default managerCalendar;