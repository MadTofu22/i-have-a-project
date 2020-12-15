import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class MyDesigners extends Component {
    
    state = {

    }

    render () {
        return (
            <>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(MyDesigners));