import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddedSkillLabel extends Component {
    
    constructor (props) {
        super(props);
        // this.ratingInputRef = React.createRef();
        this.state = {
            newRating: '',
        }
    }

    // This function handles updating the local state with the changed rating number
    handleRatingChange = (event) => {
        // console.log('newRating:', this.ratingInputRef.current.value);
        this.setState({
            newRating: event.target.value
        });
    }

    render () {
        console.log(this)
        return (
            <div className='skillLabelContainer'>
                <h4>{this.props.skill.label}</h4>
                <input 
                    type='number' 
                    className='ratingInput' 
                    defaultValue={this.props.skill.proficiency} 
                    min='1' 
                    max='5'
                    onChange={this.handleRatingChange} 
                />
                <input 
                    type='button' 
                    className='skillButton' 
                    value='Save Rating' 
                    onClick={() => this.props.updateSkill(this.props.index, this.state.newRating)} 
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