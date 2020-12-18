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

import DesignerHomeView from '../Designer/DesignerHomeView'
import ManagerHomeView from '../Manager/ManagerHomeView';
import ManagerRegistration from '../Manager/ManagerRegistration';
import Login from '../Login/Login';
import Projects from '../Designer/DesignerHomeComponents/Projects'
import AdminPage from '../AdminPage/AdminPage'

import DesignerRegistration from '../Designer/DesignerRegistration';


import FindDesigners from '../Manager/ManagerHomeComponents/FindDesigners'


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
            path={`/home`}
            component={Login}
            />

            {/* Te+mp route to help with display and testing */}
            <Route
              path={`/ManagerHomeView`}
              component={ManagerHomeView}
            />
        
             <Route 
              path={'/DesignerHomeView'}
              component={DesignerHomeView}
            />
            <Route 
              exact
              path={'/ManagerRegistration'}
              component={ManagerRegistration}
            />
             <Route 
              exact
              path={'/AdminPage'}
              component={AdminPage}
            />
            <Route 
              exact
              path={'/DesignerRegistration'}
              component={DesignerRegistration}
            />

            <Route
            exact
            path={'/FindDesigners'}
            component={FindDesigners}
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


