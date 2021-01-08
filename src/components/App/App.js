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
import AdminPage from '../AdminPage/AdminPage';
import EditProject from '../Projects/EditProject';

import DesignerRegistration from '../Designer/DesignerRegistration';

import FindDesigners from '../Manager/ManagerHomeComponents/FindDesigners'
import UpdateProfile from '../Designer/UpdateProfile';
import CreateProject from '../Projects/CreateProject';
import ProjectDetails from '../Projects/ProjectDetails';



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

    if ((this.props.store.user.id !== this.state.user.id) && this.props.store.user.id) {
      const userType = this.props.store.user.user_type;
      let redirect = '';
      console.log('in app.js componentDidUpdate, userType=', userType);
      if(userType.toLowerCase() === 'designer'){
        redirect = '/DesignerHomeView'
      } else if (userType.toLowerCase() === 'manager'){
        redirect = '/ManagerHomeView'
      } else if (userType.toLowerCase() === 'admin'){
        redirect = '/AdminPage'
      }
      console.log(redirect);      
      this.setState({
        user: this.props.store.user,
        userHome: redirect
      });
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
              authRedirect={'/home'}
            />
             <ProtectedRoute
              path="/DesignerHomeView"
              component={DesignerHomeView}
            />
             <ProtectedRoute
             // with authRedirect:
              // - if logged in, redirects to Home Page based on user 
              // if not logged in shows login
              exact
              path="/home"
              component={Login}
              authRedirect={this.state.userHome}
            />

            <ProtectedRoute
              path={`/ManagerHomeView`}
              component={ManagerHomeView}
            />
        
            <Route 
              exact
              path={'/ManagerRegistration'}
              component={ManagerRegistration}
            />
             <ProtectedRoute
              exact
              path={'/AdminPage'}
              component={AdminPage}
            />

            <Route
            exact
            path={'/FindDesigners'}
            component={FindDesigners}
            />

            <Redirect exact from='/UpdateProfile' to='/UpdateProfile/Info' />
            <ProtectedRoute
              path={'/UpdateProfile'}
              component={UpdateProfile}
            />
            <ProtectedRoute 
              path={'/CreateProject'}
              component={CreateProject}
            />
            <ProtectedRoute 
              path={'/ProjectEdit/:project_id'}
              component={EditProject}
            /> 
              <ProtectedRoute 
              path={`/projectDetails/:project_id`}
              component={ProjectDetails}
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