import React, { Component } from 'react';  
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

import Calendar from '../Designer/DesignerHomeComponents/Calendar';
import ManagerHomeView from '../Manager/ManagerHomeView';
import Projects from '../Designer/DesignerHomeComponents/Projects';
import ManagerRegistration from '../Manager/MangerRegistration';

import MyProfile from '../Designer/DesignerHomeComponents/MyProfile';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <Route
              exact
              path={`/DesignCalendar`}
              component={Calendar} 
            />

            {/* Te+mp route to help with display and testing */}
            <Route
              path={`/ManagerHomeView`}
              component={ManagerHomeView}
            />
            <Route 
              exact
              path={'/DesignProjects'}
              component={Projects}
            />
            <Route 
              exact
              path={'/ManagerRegistration'}
              component={ManagerRegistration}
            />
            

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);


