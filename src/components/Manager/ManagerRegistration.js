import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ManagerRegistration extends Component {

    state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      company: '',
      firstName: '',
      lastName: '',
      passwordIsMatch: null
    };
  
    registerUser = (event) => {
        event.preventDefault();
  
      if (this.state.email && this.state.password && this.state.passwordIsMatch) {        

        this.props.dispatch({
          type: 'REGISTER',
          payload: {
            username: this.state.email,
            password: this.state.password,
            company: this.state.company,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          }
        });
        
      } else {
        this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
      }

    // history.push to '/ManagerHomeView'
    // TECH DEBT: REPLACE THIS WITH LOGIN FUNCTIONALITY DISPATCH AND THEN ONTO MANAGER HOME VIEW
        this.props.history.push('/ManagerHomeView');

    } // end registerUser
  
    handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
      if (propertyName === 'passwordConfirmation') {
        this.checkpasswordMatch();
      } 
    }

    checkpasswordMatch = () => {
      if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({
          passwordIsMatch: true
        })
      }
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
            <h1>Manager Registration</h1>
            <div>
              <label htmlFor="email">
                Email:
                <input
                  type="text"
                  name="email"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('email')}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="passwordConfirmation">
                Password Confirmation:
                <input
                  type="password"
                  value={this.state.passwordConfirmation}
                  onChange={this.handleInputChangeFor('passwordConfirmation')}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="firstName">
                First Name:
                <input
                  type="firstName"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChangeFor('firstName')}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="lastName">
                Last Name:
                <input
                  type="lastName"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChangeFor('lastName')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="company">
                Company:
                <input
                  type="company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleInputChangeFor('company')}
                  required
                />
              </label>
            </div>
            <div>
              <input
                className="register"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
          
            <button
              type="button"
              className="link-button"
              onClick={() => {this.props.history.push('/home')}}
            >
              Login
            </button>
          
        </div>
      );
    }
  }
  
  // Instead of taking everything from state, we just want the error messages.
  // if you wanted you could write this code like this:
  // const mapStateToProps = ({errors}) => ({ errors });
 

export default withRouter(connect(mapStoreToProps)(ManagerRegistration));