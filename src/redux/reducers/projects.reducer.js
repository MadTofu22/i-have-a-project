const projects = (state = {}, action) => {
  let projects = []
    switch (action.type) {

      case 'SET_DESIGNER_PROJECTS':
        for (const project of action.payload) {
          project['start'] = dateFunction(project.start)
          project['due_date'] = dateFunction(project.due_date)
          projects.push(project)
        }
        return action.payload;

      case 'SET_MANAGER_PROJECTS':
        
        for (const project of action.payload) {
          project['start'] = dateFunction(project.start)
          project['due_date'] = dateFunction(project.due_date)
          projects.push(project)
       }
        return projects;
      default:
        return state;
    }
  };

  const dateFunction = (date) => {
    console.log("date", date)
    let day = date.slice(8,10)
    console.log("date", day)
    let month = date.slice(5,7)
    console.log("date", month)
    let year = date.slice(0,4)
    console.log("date", year)
    let americanDateFormat = month + "/" + day + "/" + year
    return americanDateFormat
}

  export default projects;