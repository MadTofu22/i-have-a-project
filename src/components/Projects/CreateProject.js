import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Projects.css'
import { theme } from '../App/Material-UI/MUITheme';
import { ThemeProvider } from '@material-ui/core';

import AddDesignerToProject from '../Modals/AddDesignerToProject'

class CreateProject extends Component {
	state = {
		newProject: {
			project_name: '',
			status: 'New',
			due_date: '',
			notes: '',
			start: '',
			TeamDesigners: [

			]
		},
		status: [
			'Active',
			'New',
			'Complete',
		]
	};
	addSelectedDesigners = (designers) => {
		this.setState({
			newProject: {
				...this.state.newProject,
				TeamDesigners: designers
			}
		})
	}

	handlechange = (event, keyname) => {
		this.setState({
			newProject: {
				...this.state.newProject,
				[keyname]: event.target.value
			}
		});
	}
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.dispatch({
			type: "CREATE_PROJECT",
			payload: {project: this.state.newProject, nav: this.props.history}
		})
	}
	componentDidMount = () => {
		this.props.dispatch({
			type: "FETCH_DESIGNERS"
		})
	}

	fillInfo = () => {
		this.setState({
			newProject: {
				project_name: 'New Product Line for Prime',
				notes: '3D render for the protoypes of a new product line that Prime wants to roll out before Q4.',
				due_date: '2021-01-29',
				start: '2021-01-11',
				status: 'New',
				TeamDesigners: [
				
			],
			},
			filled: true,
		});
	}

	handleSetEstHours = (designerID, event) => {
		let newDesignerArray = JSON.parse(JSON.stringify(this.state.newProject.TeamDesigners))
		console.log(this.state.newProject.TeamDesigners);
		
		this.state.newProject.TeamDesigners.forEach( (designer, index) => {
			if (designer.designer_id === designerID) {
				let updatedDesigner = designer
					updatedDesigner['hours_est'] = event.target.value
				newDesignerArray.splice(index, 1)
				this.setState({
					newProject: {
						...this.state.newProject,
						teamDesigners: [
							...newDesignerArray,
							updatedDesigner
						]
					}
				})
			}
		})
	}

	render() {
		console.log(this.state);
		return (
			<div className='componentViewWrap'>
				<ThemeProvider theme={theme}>
				<h1><button id="hiddenButton" onClick={this.fillInfo}>A</button>Enter New Project Information</h1>
				<form onSubmit={(event) => this.handleSubmit(event)} >
					<div className="createProjectForm">
						<div className="createProject-left">
							<div className="projectInput">
								<TextField 
									id="outlined-basic" 
									label="Project Name" 
									variant="outlined" 
									value={this.state.filled ? this.state.newProject.project_name : ''}
									onChange={(event) => this.handlechange(event, 'project_name')}
								/>
							</div>
							<div className="projectInput">
								<TextField
									
									id="date"
									label="Start Date"
									type="date"
									variant="outlined"
									value={this.state.filled ? this.state.newProject.start : ''} 
									InputLabelProps={{
									shrink: true,
									}}
									onChange={(event) => this.handlechange(event, 'start')}
								/>
								<br/>
								<br/>

								<TextField
									id="date"
									label="Due Date"
									type="date"
									variant="outlined" 
									value={this.state.filled ? this.state.newProject.due_date : ''}
									InputLabelProps={{
									shrink: true,
									}}
									onChange={(event) => this.handlechange(event, 'due_date')}
								/>
							</div>
							<div className="projectInput">
								<TextField
									id="notes"
									variant="outlined"
									label="Short Description"
									multiline
									value={this.state.filled ? this.state.newProject.notes : ''}
									rows={4}
									onChange={(event) => this.handlechange(event, 'notes')}
									helperText="Enter Quick Description of Project"
								/>
							</div>
						</div>
						<div className="createProject-right">
								
							<div  className="projectInput">
							
								<TextField
									className="projectInput"
									id="project-status"
									select
									label="Status"
									onChange={(event) => this.handlechange(event, 'status')}
									helperText="Select Project Status"
									value={this.state.filled ? this.state.newProject.status : ''}
									>
									{this.state.status.map((option) => (
										<MenuItem key={option} value={option}>
										{option}
										</MenuItem>
									))}
								</TextField>
							</div>
							<div className="createBtn">
								<Button 
										type="submit"
										variant="contained" 
										color="secondary"
									>
										Create Project
								</Button>
							</div>
						</div >
						
					</div>
					<AddDesignerToProject 
								addSelectedDesigners={this.addSelectedDesigners} 
								SelectedDesigners={this.state.newProject.TeamDesigners}
					/>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
							<TableRow>
								{/* <TableCell>Designer Name</TableCell>
								<TableCell align="right">Committed Hours</TableCell> */}
							</TableRow>
							</TableHead>
							<TableBody>
						{
							this.state.newProject.TeamDesigners.length > 0 ?
								this.state.newProject.TeamDesigners.map(designer => {
									return(
										<>
											<TableRow key={designer.designer_id}>
											<TableCell component="th" scope="row">
												{designer.first_name + ' ' + designer.last_name}
											</TableCell>
											<TableCell align="right">
												<TextField
													id="project-status"
													type='number'
													label="Est. Hours"
													helperText="Estimated Hours Committed to Project"
													defaultValue={designer.hours_est}
													onChange={(event) => this.handleSetEstHours(designer.designer_id, event)}
													>
												</TextField>
											</TableCell>
											</TableRow>
										</>
									)
								})
							:
								<TableCell >
									No Designers Added Yet
								</TableCell>
							}
					        </TableBody>
      					</Table>
   					</TableContainer>
				</form>

				</ThemeProvider>
			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(CreateProject));
