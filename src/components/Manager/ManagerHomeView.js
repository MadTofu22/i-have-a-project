import React, {Component} from 'react';
import {HashRouter as Router, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Manager.css';

// Import components
import NavButton from './ManagerHomeComponents/NavButton';
import Dashboard from './ManagerHomeComponents/Dashboard';
import Calendar from './ManagerHomeComponents/Calendar';
import ContractRequests from './ManagerHomeComponents/ContractRequests';
import MyDesigners from './ManagerHomeComponents/MyDesigners';
import FindDesigners from './ManagerHomeComponents/FindDesigners';
import { theme } from '../App/Material-UI/MUITheme';
import { ThemeProvider, Button, Box, Container } from '@material-ui/core';

class ManagerHomeView extends Component {
    
    state = {

    }

    createRandomPassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const passwordLength = 8;
        let password = '';

        for (let i=0; i<passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log('Random password created:', password);
        return password;
    }

    // Handles logging out the user 
	handleLogout = () => {
        this.props.history.push('/Login');
        this.props.dispatch({type: 'LOGOUT'});
    }
    
    goToCreateProject = () => {
        this.props.history.push('/CreateProject')
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_SOFTWARE_LIST"
        });
        this.props.dispatch({
            type: "FETCH_MANAGER_PROJECTS"
        });
        this.props.dispatch({
            type: "FETCH_DESIGNERS"
        })
    }

    render () {
        const pages = [
            {
                path: '/ManagerHomeView/Projects', 
                label: 'Projects'
            },
            {
                path: '/ManagerHomeView/Designers', 
                label: 'My Designers'
            },
            {
                path: '/ManagerHomeView/Calendar', 
                label: 'Calendar'
            },
            {
                path: '/ManagerHomeView/Requests', 
                label: 'Contract Requests'
            },
            {
                path: '/ManagerHomeView/Search',
                label: 'Find Designers'
            },
        ];

        return (
            <Router>
                <ThemeProvider theme={theme}>
      
                <div className='topSection'>
                    <div className='managerNavBar'>
                        <h2>iHaveAProject</h2>
                        {pages.map((page, index) => {
                            return <NavButton key={index} page={page} />
                        })}
                        <Button onClick={this.goToCreateProject} className='headerButton'>Create New Project</Button>
                        <Button className='headerButton'>Account Settings</Button>
                        <Button 
							className='headerButton' 
							onClick={() => this.handleLogout()}
							>Logout
						</Button>
                    </div>
                </div>
                {/* <Container maxWidth="md">
                <Box bgcolor="primary.light" height> */}
                {/* Routes to each component */}
                
                <div className='homeComponentWrapper'>
                    <Redirect exact from='/ManagerHomeView' to='/ManagerHomeView/Projects' />
                    <Route 
                        exact
                        path={`/ManagerHomeView/Projects`}
                        component={Dashboard}
                    />
                    <Route
                        exact
                        path={`/ManagerHomeView/Designers`}
                        component={MyDesigners}
                    />
                    <Route 
                        exact
                        path={`/ManagerHomeView/Calendar`}
                        component={Calendar}
                    />
                    <Route 
                        exact
                        path={`/ManagerHomeView/Requests`}
                        component={ContractRequests}
                    />
                    <Route
                        exact
                        path={`/ManagerHomeView/Search`}
                        component={FindDesigners}
                    />
                </div>
                {/* </Box>
                </Container> */}
                </ThemeProvider>
            </Router>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerHomeView));