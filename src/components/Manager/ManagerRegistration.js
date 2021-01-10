import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { theme } from '../App/Material-UI/MUITheme';
import { ThemeProvider, Button, Container, Box } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';



class ManagerRegistration extends Component {

    state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      company: '',
      firstName: '',
      lastName: '',
      passwordIsMatch: null,
      passwordConfirmationMsg: ''
    };
  
    registerUser = (event) => {
        event.preventDefault();
  
      if (this.state.email && this.state.password && this.state.passwordIsMatch) {        

        this.props.dispatch({
          type: 'REGISTER',
          payload: {
            username: this.state.username,
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
      this.returnPassworkResponse()
    }

    checkpasswordMatch = () => {
      if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({
          passwordIsMatch: true
        })
      }
    }
    returnPassworkResponse = () => {
      if (this.state.password === this.state.passwordConfirmation) {
        this.setState({
          passwordConfirmationMsg: ''
        })
      } else {
        this.setState({
          passwordConfirmationMsg: 'Please make sure your password matches!'
        })
      }
    }

    fillInfo = () => {
      this.setState ({
          username: 'elliotmalcolm@hotmail.com',
          password: '123456',
          passwordConfirmation: '123456',
          company: 'Digital Masterworks',
          firstName: 'Elliot',
          lastName: 'Malcolm',
          passwordIsMatch: null,
          passwordConfirmationMsg: ''
      })
    }
  
    render() {
      return (
        <div className="registerWrap">
          <div className='registrationElements'>
          <h1 className="loginTitle">I Have A Project</h1>
          <button id="hiddenButton" onClick={this.fillInfo}> </button>

          <ThemeProvider theme={theme}>
          <h3 className="loginTitle">Manager Registration</h3>
          {this.props.store.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.store.errors.registrationMessage}
            </h2>
          )}
          <form onSubmit={this.registerUser} className="registerForm">
         
            <div  className="registerInput">
              <label>
                  
                  <div>
                    <TextField
                      label="First Name"
                      type="firstName"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleInputChangeFor('firstName')}
                      variant="outlined"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      label="Last Name"
                      type="lastName"
                      name="lastName"
                      value={this.state.lastName}
                      required
                      onChange={this.handleInputChangeFor('lastName')}
                      variant="outlined"
                    />
                  </div>
              </label>
            </div>
            <div className="registerInput">
              <label htmlFor="email">
               
                <TextField
                  type="text"
                  name="email"
                  label="Email"
                  helperText='This will be your username'
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('email')}
                  variant="outlined"
                  required
                />
              </label>
            </div>
            <div className="registerInput">
              <label htmlFor="password">
                
                <TextField
                  type="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                  variant="outlined"
                  required
                />
              </label>
            </div>
            <div className="registerInput">
              <label htmlFor="passwordConfirmation">
                <TextField
                  type="password"
                  label="Confirm Password"
                  helperText={this.state.passwordConfirmationMsg}
                  value={this.state.passwordConfirmation}
                  onChange={this.handleInputChangeFor('passwordConfirmation')}
                  variant="outlined"
                  required
                />
              </label>
            </div>
            <div className="registerInput">
              <label htmlFor="company">
              
                <TextField
                  label="Company"
                  type="company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleInputChangeFor('company')}
                  required
                  variant="outlined"
                />
              </label>
            </div>
            <div className="registerInput">
                <Button
            
                type="submit"
                name="submit"
                value="Log In"
                variant="contained"
                >Register</Button>
            </div>
          </form>
          
          <div className="loginOption">
              Already a Member?
            <Button
              style={{color: 'blue', justifyContent: 'center'}}
              variant='link' color="secondary" 
              className="loginRegisterBtn"
              onClick={() => {this.props.history.push('/Login')}}
            >
              Login
            </Button>
          </div>
            </ThemeProvider>
          </div>
        </div>
      );
    }
  }
  
  // Instead of taking everything from state, we just want the error messages.
  // if you wanted you could write this code like this:
  // const mapStateToProps = ({errors}) => ({ errors });
 

export default withRouter(connect(mapStoreToProps)(ManagerRegistration));