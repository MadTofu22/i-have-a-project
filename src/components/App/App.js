import React, { Component } from 'react';  
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

import DesignerHomeView from '../Designer/DesignerHomeView'
import ManagerHomeView from '../Manager/ManagerHomeView';
import ManagerRegistration from '../Manager/ManagerRegistration';
import Login from '../Login/Login';
import AdminPage from '../AdminPage/AdminPage'

import DesignerRegistration from '../Designer/DesignerRegistration';


import FindDesigners from '../Manager/ManagerHomeComponents/FindDesigners'
import UpdateProfile from '../Designer/UpdateProfile';
import CreateProject from '../Manager/CreateProject'


class App extends Component {

  state = {
    user: {
      id: 0
    },
    userHome: '/login'
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_USER' });
    
    console.log(this.state.userHome);
    
  }
  componentDidUpdate = () => {
    if (this.props.store.user.id !== this.state.user.id) {
      let redirect;
      if(this.props.store.user.user_type === 'Designer'){
        redirect = '/DesignerHomeView'
      } else if ( this.props.user.user_type === 'Manager'){
        redirect = '/ManagerHomeView'
      } else if ( this.props.user.user_type === 'Admin'){
        redirect = '/AdminPage'
      }
      console.log(redirect);      
      this.setState({
        user: this.props.store.user,
        userHome: redirect
      })
    }
  }
  

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/Login" />
            
             <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to Home Page based on user 
              // if not logged in shows login
              exact
              path="/Login"
              component={Login}
              authRedirect={this.state.userHome}
            />
             <ProtectedRoute
              path="/DesignerHomeView"
              component={DesignerHomeView}
            />

            {/* Te+mp route to help with display and testing */}
            <Route
              path={`/ManagerHomeView`}
              component={ManagerHomeView}
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

            <Redirect exact from='/UpdateProfile' to='/UpdateProfile/Info' />
            <Route
              path={'/UpdateProfile'}
              component={UpdateProfile}
            />
            <Route 
              path={'/CreateProject'}
              component={CreateProject}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(mapStoreToProps)(App);


