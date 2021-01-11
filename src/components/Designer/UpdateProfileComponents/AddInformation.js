import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import AddedSkillLabel from './AddedSkillLabel';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import './profile.css'

class AddInformation extends Component {

	constructor (props) {
		super(props);
		console.log('in addinfo constructor, props:', props)
		this.educationTitleInputRef = React.createRef();
		this.educationLocationInputRef = React.createRef();
		this.careerTitleInputRef = React.createRef();
		this.careerLocationInputRef = React.createRef();
		this.skillInputRef = React.createRef();
		this.state = {
			profile: this.props.profile,
			newProfile: {
				career: {},
				education: {},
			},
		};
	}

	fillForm = () => {
		this.setState({
			profile: {
				career: [
					{location: 'Prime Digital Academy', title: 'Full Stack Software Engineering Student'},
				],
				education: [
					{location: 'Prime Digital Academy', degree: 'Full Stack Software Engineering'}
				],
				software: [
					{label: 'AutoCAD', proficient: true},
					{label: 'Blender', proficient: false},
					{label: 'Adobe Illustrator', proficient: false},
					{label: 'MS Paint', proficient: false},
					{label: 'FreeCAD', proficient: false},
				],
				designer: {
					phone: '(612)-555-4326',
					linkedin: 'linkedin.com/peter-pierce',
					photo: 'images/simon.png',
				},
				skills: [
					{label: 'Communication', proficiency: 3},
					{label: 'Texturing', proficiency: 3},
					{label: 'Vector Math', proficiency: 3},
				],
				filled: true
			}
		})
	}

	componentDidMount = () => {
		this.props.dispatch({
			type: 'FETCH_PROFILE',
			payload: this.props.store.user.designer_id
		});
		// this.setState({
		// 	profile: this.props.store.profile,
		// });
	}

	// This function marks the state for the selected software as checked and toggles the save button enabled
	handleCheckboxChange = (index) => {

		let newSoftwareList = this.state.profile.software.slice();
		newSoftwareList[index].proficient = !this.state.profile.software[index].proficient;

		console.log('in handleCheckBoxChange - index:', index, '; newSoftwareList:', newSoftwareList);

		this.setState({
			...this.state,
			profile: {
				...this.state.profile,
				software: newSoftwareList,
			}
		});
	}

	// This function updates the local state with the current input in the Enter Skill field
	handleSkillInputChange = (event) => {

		console.log(this.skillInputRef)
		this.setState({
			...this.state,
			currentSkillInput: this.skillInputRef.current.value,
		});
	}

	// This function adds a skill to the skills list array and sets the default rating to 3
	addSkill = () => {

		this.setState({
			...this.state,
			profile: {
				...this.state.profile,
				skills: [
					...this.state.profile.skills,
					{
						label: this.state.currentSkillInput,
						proficiency: '3',
					}
				]
			}
		});
		this.skillInputRef.current.value = '';	
	}

	// This function updates the local state skills list with User added skills and their ratings.
	updateSkill = (index, newRating) => {

		console.log('in updateSkill - index:', index, '; newRating:', newRating)

		let newSkillsList = this.state.profile.skills.slice();
		newSkillsList[index] = {...this.state.profile.skills[index], label: this.state.profile.skills[index].label, proficiency: newRating};

		console.log('in updateSkill - newSkillList:', newSkillsList, 'state skillsList:', this.state.profile.skills);

		this.setState({
			...this.state,
			profile: {
				...this.state.profile,
				skills: newSkillsList,
			},
		});
	}

	// This function removes a skill from the local state skills list by it's index and removes it from the DB
	removeProfileItem = (item, itemType, index) => {

		let newItemList = this.state.profile[itemType].slice();
		newItemList.splice(index, 1);
		
		console.log('in removeProfileItem original list:',this.state.profile[itemType],  '; newItemList:', newItemList);

		this.setState({
			...this.state,
			profile: {
				...this.state.profile,
				[itemType]: newItemList,
			},
		});

		this.props.dispatch({
			type: 'DELETE_SKILL',
			payload: {item, itemType}
		});
	}
	
	// This function handles storing the work and education history inputs in the local state on change
	handleInputChange = (event, section, property) => {

		this.setState({
			...this.state,
			profile: {
				...this.state.profile,
				[section]: {
					...this.state.profile[section],
					[property]: event.target.value,
				}
			}
		})
	}

	// This function adds a new career or education item to the users history.
	handleHistoryInputChange = (event, section, property) => {

		this.setState({
			...this.state,
			newProfile: {
				...this.state.newProfile,
				[section]: {
					...this.state.newProfile[section],
					[property]: event.target.value,
				}
			}
		})
	}

	// This function handles adding an item to the education or work history list
	updateHistoryList = (section) => {

		if (((section === 'education' && this.state.newProfile[section].degree) || (section === 'career' && this.state.newProfile[section].title)) && this.state.newProfile[section].location) {

			let titleRef = `${section}TitleInputRef`;
			let locationRef = `${section}LocationInputRef` ;
	
			this.setState({
				...this.state,
				profile: {
					...this.state.profile,
					[section]: [...this.state.profile[section], this.state.newProfile[section]],
				}	
			});
	
			this[titleRef].current.value = '';
			this[locationRef].current.value = '';
		} else {
			alert ('Please ensure all inputs are filled and valid.')
		}
	}

	render() {
		console.log('UpdateProfile/info has rendered - this.props:', this.props, this.state)
		return (
		<div className="componentViewWrap">
					<Button
						onClick={() => {this.props.saveAndNavigate('/DesignerHomeView', this.state.profile)}}
					>Save and Go Home
					</Button>
			<div className="profileWrap">
				<div className="addInfoWrap">
					<br/>
					<h2>Add Information<button id='fillBuildProfile' onClick={this.fillForm}>A</button></h2>
					<TextField
						variant="outlined" 
						type='text'
						id='phoneNum'
						label="Phone Number"
						defaultValue={this.state.profile.designer ? this.state.profile.designer.phone : ''}
						value={this.state.profile.filled ? '(612) 555-4326' : ''}
						onChange={(event) => this.handleInputChange(event, 'designer', 'phone')}
					/>
					<br/>
					<br/>
					<TextField 
						type='text'
						variant="outlined" 
						id='imgUrl'
						label="Profile Image URL"
						defaultValue={this.state.profile.designer ? this.state.profile.designer.photo : ''}
						value={this.state.profile.filled ? 'images/simon.png' : ''}
						onChange={(event) => this.handleInputChange(event, 'designer', 'photo')}
					/>
					<br/>
					<br/>
					<TextField 
						type='text'
						variant="outlined" 
						label="LinkedIn Page"
						id='linkedinUrl'
						onChange={(event) => this.handleInputChange(event, 'designer', 'linkedin')}
						value={this.state.profile.filled ? 'linkedin.com/peter-pierce' : ''}
						defaultValue={this.state.profile.designer ? this.state.profile.designer.linkedin : ''}
					/>
					<br/>
					<h2>Added Education</h2>
					<TextField 
						type='text'
						variant="outlined" 
						label="Degree"
						id='educationDegree'
						ref={this.educationTitleInputRef}
						onChange={(event) => this.handleHistoryInputChange(event, 'education', 'degree')}
					/>
				
					<TextField 
						type='text'
						variant="outlined" 
						label="Institution"
						id='educationLocation'
						ref={this.educationLocationInputRef}
						onChange={(event) => this.handleHistoryInputChange(event, 'education', 'location')}
					/>
					<Button color='default' onClick={() => this.updateHistoryList('education')}>Add</Button>
					
					<ul>
						{this.state.profile.education ? this.state.profile.education.map((row, index) => {
							return <li key={index}>
								{row.degree} from {row.location}
								<IconButton aria-label="delete" onClick={() => this.removeProfileItem(row, 'education', index)}>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</li>
						}) : ''}
					</ul>
					<br/>
					<h2>Added Work Experience</h2>
					<TextField
						variant="outlined" 
						type='text'
						label='Career Title'
						ref={this.careerTitleInputRef}
						onChange={(event) => this.handleHistoryInputChange(event, 'career', 'title')}
					/>
			
					<TextField
						variant="outlined" 
						type='text'
						id='careerLocation'
						label="Company"
						ref={this.careerLocationInputRef}
						onChange={(event) => this.handleHistoryInputChange(event, 'career', 'location')}
					/>
					
					<Button color='default' onClick={() => this.updateHistoryList('career')}>Add</Button>
					
					<ul>
						{this.state.profile.career ? this.state.profile.career.map((job, index) => {

							return <li key={index}>
									{job.title} at {job.location}
									<IconButton aria-label="delete" onClick={() => this.removeProfileItem(job, 'career', index)}>
										<DeleteIcon fontSize="small" />
									</IconButton>
								</li>
						}) : ''}
					</ul>
				</div>
				
				<div className="addInfoWrap">
					
					<h2>Software</h2>
					{this.state.profile.software ? this.state.profile.software.map((software, index) => {
						return <div key={index}>
								<Checkbox 
									type='checkbox'
									id={`software${index}`} 
									name={`software${index}`} 
									color='default'
									key={index} 
									value={software.label}
									checked={software.proficient}
									onChange={() => this.handleCheckboxChange(index)}
								/>
								<label htmlFor={`software${index}`}>{software.label}</label>
							</div>
					}) : ''}
								<div >
									<div className="skillTitleWrap">
											<h2>Add Skills</h2>
											<TextField 
												type='text' 
												variant='outlined'
												id='skillInput' 
												label='Skill Name'
												className='skillsTextField' 
												ref={this.skillInputRef} 
												onChange={this.handleSkillInputChange} />
											<Button id='addSkill' value='Add' color='default' onClick={this.addSkill}>Add</Button>
									</div>
										<div className="skillListWrap">
											
												<div className="skillsSection">
													{this.state.profile.skills ? this.state.profile.skills.map((skill, index) => {
														return 	<AddedSkillLabel 
																		key={index} 
																		index={index} 
																		skill={skill} 
																		removeProfileItem={this.removeProfileItem} 
																		updateSkill={this.updateSkill} 
																	/>
																
													}) : ''}
												</div>
										</div>
						</div>
					</div>					
				</div>
			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddInformation));