import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

class AddedSkillLabel extends Component {
    
    constructor (props) {
        super(props);
        // this.ratingInputRef = React.createRef();
        this.state = {
            newRating: this.props.skill.proficiency,
        }
    }

    // This function handles updating the local state with the changed rating number
    handleRatingChange = (event) => {
        
        let num = Number(event.target.value);

        if(num > 5) {
            num = 5;
        } else if (num < 1) {
            num = 1;
        } else {
            console.log('rating is between 1 and 5');
        }

        this.setState({
            newRating: num
        });
    }

    render () {
        console.log(this)
        return (
            <div className="skillWrap">
            <Paper className='componentViewWrap'>
               

                
                <h3>{this.props.skill.label}</h3>
                <TextField 
                    type='number' 
                    variant="outlined" 
                    className='ratingInput' 
                    value={this.state.newRating} 
                    min='1' 
                    max='5'
                    onChange={this.handleRatingChange} 
                />
                <IconButton aria-label="save" onClick={() => this.props.updateSkill(this.props.index, this.state.newRating)}>
                    <SaveIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => this.props.removeProfileItem(this.props.skill, 'skills', this.props.index)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Paper>
            </div>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(AddedSkillLabel));