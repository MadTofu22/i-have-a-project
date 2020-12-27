import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddedSkillLabel extends Component {

    render () {
        return (
            <>
                <h4></h4>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(AddedSkillLabel));