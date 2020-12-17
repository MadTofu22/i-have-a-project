import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ManagerRegistration extends Component {

    state = {
      username: '',
      password: '',
    };
  
    registerUser = (event) => {
      event.preventDefault();
  
    //   if (this.state.username && this.state.password) {
    //     this.props.dispatch({
    //       type: 'REGISTER',
    //       payload: {
    //         username: this.state.username,
    //         password: this.state.password,
    //       },
    //     });
        
    //   } else {
    //     this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    //   }

    // history.push to '/ManagerHomeView'
    // TECH DEBT: REPLACE THIS WITH LOGIN FUNCTIONALITY DISPATCH AND THEN ONTO MANAGER HOME VIEW


    } // end registerUser
  
    handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
    }
  
    render() {
      return (
        <div>
          {this.props.store.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.store.errors.registrationMessage}
            </h2>
          )}
          <form onSubmit={this.registerUser}>
            <h1>Register Manager</h1>
            <div>
              <label htmlFor="username">
                Email:
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>

            {/* Here be other fields from the Manager User table. Also throw in a confirm password field */}

            <div>
              <label htmlFor="passwordConfirmation">
                Password Confirmation:
                <input
                  type="passwordConfirmation"
                  name="passwordConfirmation"
                  value={this.state.passwordConfirmation}
                  onChange={this.handleInputChangeFor('passwordConfirmation')}
                />
              </label>
            </div>

            <div>
                {/* Add a conditional to prevent insufficient input from advancing */}
              <input
                className="register"
                type="submit"
                name="submit"
                value="Register"
                
              />
            </div>
          </form>
          {/* <center>
            <button
              type="button"
              className="link-button"
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
            >
              Login
            </button>
          </center> */}
        </div>
      );
    }
  }
  
  // Instead of taking everything from state, we just want the error messages.
  // if you wanted you could write this code like this:
  // const mapStateToProps = ({errors}) => ({ errors });
 

export default withRouter(connect(mapStoreToProps)(ManagerRegistration));