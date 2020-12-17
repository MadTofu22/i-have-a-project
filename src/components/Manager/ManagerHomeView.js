import React, {Component} from 'react';
import {HashRouter as Router, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import NavButton from './ManagerHomeComponents/NavButton.js'

class ManagerHomeView extends Component {
    
    state = {

    }

    render () {
        const pages = [
            {
                path: '/dashboard', 
                label: 'Dashboard'
            },
            {
                path: '/designers', 
                label: 'My Designers'
            },
            {
                path: '/calendar', 
                label: 'Calendar'
            },
            {
                path: '/requests', 
                label: 'Contract Requests'
            },
            {
                path: '/search',
                label: 'Find Designers'
            },
        ];

        return (
            <Router>
                <div className='managerNavBar'>
                    {pages.map((page, index) => {
                        return <NavButton key={index} page={page} />
                    })}
                </div>
                {/* Routes to each component */}
                
            </Router>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerHomeView));