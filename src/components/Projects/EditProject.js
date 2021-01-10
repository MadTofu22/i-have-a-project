import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { theme } from '../App/Material-UI/MUITheme';
import { ThemeProvider } from '@material-ui/core';

class EditProject extends Component {
	state = {
        projectDetails: {
            id: 0,
            status: 'New',
            due_date: '',
            notes: '',
            project_name: '',
            manager_id: 0,
            start: ''
        },
		status: [
			'Active',
			'New',
			'Complete',
		]
	};
	addSelectedDesigners = (designers) => {
		this.setState({
			projectDesigners: designers
		})
	}

	handlechange = (event, keyname) => {
        if (event.target.value.length < 500) {
            this.setState({
                projectDetails: {
                    ...this.state.projectDetails,
                    [keyname]: event.target.value
                }
            });
        }
	}
	handleSubmit = () => {
		this.props.dispatch({
			type: "UPDATE_PROJECT",
			payload: this.state.projectDetails
		})
	}
    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_PROJECT_DETAILS",
            payload: this.props.match.params.project_id
        })
        this.props.dispatch({
			type: "FETCH_DESIGNERS"
		})
    }
    handeBackToProjectDetails = () => {
        this.props.history.push(`/projectDetails/${this.props.match.params.project_id}`)
    }
    componentDidUpdate = () => {
        console.log(this.props.store.projectDetails.projectDetails.id);
        
        if (this.props.store.projectDetails.projectDetails.id !== this.state.projectDetails.id) {
            this.setState({
                projectDetails: this.props.store.projectDetails.projectDetails,
                designerEvents: this.props.store.projectDetails.designerEvents,
                projectDesigners: this.props.store.projectDetails.projectDesigners,
            })
        }
    }

	render() {
		return (
            <ThemeProvider theme={theme}>
              
			<div className="componentViewWrap">
            <h1>Edit Project</h1>
                {  this.props.store.projectDetails.projectDetails ?
                    <form onSubmit={this.handleSubmit}>
                    <TextField 
                        id="outlined-basic" 
                        label="Project Name" 
                        variant="outlined" 
                        onChange={(event) => this.handlechange(event, 'project_name')}
                        value={this.state.projectDetails.project_name}
                    />
                    	<br></br>
					<br></br>
                    <TextField
                        id="project-status"
                        select
                        label="Status"
                        onChange={(event) => this.handlechange(event, 'status')}
                        helperText="Select Project Status"
                        value={this.state.projectDetails.status}
                        >
                        {this.state.status.map((option, index) => {
                            return(
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>)
                        })}
                    </TextField>
                    <br/>
                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(event) => this.handlechange(event, 'start')}
                        value={this.state.projectDetails.start.slice(0, 10)}
                    />
                    	<br></br>
					<br></br>
                    <TextField
                        id="date"
                        label="Due Date"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(event) => this.handlechange(event, 'due_date')}
                        value={this.state.projectDetails.due_date.slice(0, 10)}
                    />
                    	<br></br>
					<br></br>
                    <TextField
                        className="descriptionTextArea"
                        id="notes"
                        label="Description"
                        multiline
                        rows={5}
                        onChange={(event) => this.handlechange(event, 'notes')}
                        helperText="Enter Description of Project"
                        value={this.state.projectDetails.notes}
                    />
                    <br/>
                    <br/>
                    
                    <br></br>
					<br></br>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={this.handeBackToProjectDetails}
                    >
                        Back
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                    >
                        Update Project
                    </Button>
                </form>
                :
                <></>
                }
			</div>
            </ThemeProvider>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(EditProject));
