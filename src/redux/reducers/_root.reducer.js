import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import profile from './profile.reducer';

import calendar from './calendar.reducer'
import projects from './projects.reducer'
import designer from './designer.saga'
import projectDetails from './projectDetails.reducer'
import software from './software.reducer'
import search from './search.reducer'
<<<<<<< HEAD
import admin from './admin.reducer';
=======
import managerCalendar from './managerCalendar.reducer'
>>>>>>> 7502d9cdb755f840cbf25799cc873e148878e0f3

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  calendar,
  projects,
  designer,
  profile,
  projectDetails,
  software,
  search,
<<<<<<< HEAD
  admin,
=======
  managerCalendar,
>>>>>>> 7502d9cdb755f840cbf25799cc873e148878e0f3
});

export default rootReducer;
