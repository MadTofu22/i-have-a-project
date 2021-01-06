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
import { ThemeProvider, Typography, Toolbar, AppBar, Button } from '@material-ui/core';

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

    // This function handles sending an invite email to a designer and creates their account in the DB
    sendInvite = (inviteData) => {
        inviteData = {
            userData: {
                email: 'ukkonendevs@gmail.com',
                password: this.createRandomPassword(),
                user_type: 'Designer',
                first_name: 'Ukkonen',
                last_name: 'Dev',
                company: this.props.store.user.company,
            },
            designerData: {
                manager_id: this.props.store.user.id,
                rate: 60,
            },
        };
        console.log('testing invite - inviteData:', inviteData);
        this.props.dispatch({type: 'REGISTER_DESIGNER', payload: inviteData});
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_SOFTWARE_LIST"
        })
    }

    render () {
        const pages = [
            {
                path: '/ManagerHomeView/Dashboard', 
                label: 'Dashboard'
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
                    <div className='titleContainer'>
                        <h1 className='header'>Welcome to Your Home View</h1>
                    </div>
                    <div className='managerNavBar'>
                        {pages.map((page, index) => {
                            return <NavButton key={index} page={page} />
                        })}
                         <Button className='headerButton'>Create New Project</Button>
                        <Button className='headerButton'>Account Settings</Button>
                        <Button 
							className='headerButton' 
							onClick={() => this.handleLogout()}
							>Logout
						</Button>

                        {/* This button will run a test to ensure the saga creates the designer in the DB */}
                        <Button className='headerButton' onClick={() => this.sendInvite()}>TEST INVITE DESIGNER</Button>
                    </div>
                </div>

                {/* Routes to each component */}
                <div className='homeComponentWrapper'>
                    <Redirect exact from='/ManagerHomeView' to='/ManagerHomeView/Dashboard' />
                    <Route 
                        exact
                        path={`/ManagerHomeView/Dashboard`}
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
                </ThemeProvider>
            </Router>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerHomeView));