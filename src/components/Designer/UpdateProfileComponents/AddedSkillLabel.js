import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddedSkillLabel extends Component {

    state = {
        label: this.props.skill.label,
        rating: this.props.skill.rating,
        newRating: '',
    }

    // This function handles updating the local state with the changed rating number
    handleRatingChange = event => {
        console.log('newRating:', event.target.value);
        this.setState({
            ...this.state,
            newRating: event.target.value
        });
    }

    render () {
        console.log(this)
        return (
            <div className='skillLabelContainer'>
                <h4>{this.state.label}</h4>
                <input 
                    type='number' 
                    className='ratingInput' 
                    defaultValue={this.props.skill.rating} 
                    min='1' 
                    max='5' 
                    onChange={this.handleRatingChange} 
                />
                <input 
                    type='button' 
                    className='skillButton' 
                    value='Save Rating' 
                    onClick={() => this.props.updateSkill(this.state.label, this.state.newRating)} 
                />
                <input 
                    type='button' 
                    className='skillButton' 
                    value='Delete' 
                    onClick={() => this.props.removeSkill(this.props.index)} 
                />
            </div>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(AddedSkillLabel));