import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { theme } from '../App/Material-UI/MUITheme';
import { ThemeProvider, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from './Login.css'

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className='loginElements'>
        <ThemeProvider theme={theme}>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
              Username:
          <Input
          id="input-with-icon-adornment"
          startAdornment=
          {<InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>}
          value={this.state.username}
                onChange={this.handleInputChangeFor('email')}></Input>
          {/* <label htmlFor="email">
              Username: */}
              {/* <input
                type="text"
                name="email"
                value={this.state.username}
                onChange={this.handleInputChangeFor('email')}
              /> */}
            {/* </label> */}
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
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        
          <Button
          variant="contained" color="secondary" style={{ margin: 20 }}
            className="link-button"
            onClick={() => {this.props.history.push('/ManagerRegistration')}}
          >
            Register
          </Button>
          </ThemeProvider>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);