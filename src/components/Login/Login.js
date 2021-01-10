import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import { theme } from '../App/Material-UI/MUITheme';
import {withRouter} from 'react-router-dom';
import { ThemeProvider, Button, Container, Box } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './Login.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
          history: this.props.history,
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

  fillSimonInfo = () => {
    this.setState({
    username: 'sgermscheid@gmail.com',
    password: 'simon',
    })
  }

  fillPeterInfo = () => {
    this.setState({
    username: 'peterp@gmail.com',
    password: 'peter',
    })
  }

  fillElliotInfo = () => {
    this.setState({
    username: 'elliotmalcolm@hotmail.com',
    password: 'elliot',
    })
  }

  render() {
    return (
      <div className="loginWrap">
      <div className='loginElements'>
        <h2 className="loginTitle">I Have A Project</h2>
        <button id="hiddenButtonLoginSimon" onClick={this.fillSimonInfo}> </button>
        <button id="hiddenButtonLoginPeter" onClick={this.fillPeterInfo}> </button>
        <button id="hiddenButtonLoginElliot" onClick={this.fillElliotInfo}> </button>

        <ThemeProvider theme={theme}>
        <Container maxWidth="md">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} className="loginForm">

          <div  className="loginInput">
          <TextField
          label="username"
          variant="outlined"
          InputProps={{
            startAdornment: (
            <InputAdornment 
              position="start">
                <AccountCircle/>
            </InputAdornment>)
          }}
            value={this.state.username}
                onChange={this.handleInputChangeFor('username')}></TextField>
          </div>
          <div  className="loginInput">
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
          <div  
            className="loginBTN"
          >
            <Button
              type="submit"
              name="submit"
              value="Log In"
              variant="contained"
            >Log In</Button>
          </div>
        </form>
          <div className="registerOption">
            Not a member?
            <Button
              style={{color: 'blue'}}
              variant='link' color="secondary" 
              className="loginRegisterBtn"
              onClick={() => {this.props.history.push('/ManagerRegistration')}}
            >
              register
            </Button>
          </div>
          </Container>
          </ThemeProvider>
      </div>
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

export default withRouter(connect(mapStateToProps)(LoginPage));