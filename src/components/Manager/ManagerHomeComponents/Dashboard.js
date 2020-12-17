import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class Dashboard extends Component {
    
    state = {

    };

    render () {
        return (
            <div className=''>

            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(Dashboard));