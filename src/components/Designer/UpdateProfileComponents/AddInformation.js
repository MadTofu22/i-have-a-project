import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import AddedSkillLabel from './AddedSkillLabel';

import './profile.css'

class AddInformation extends Component {

	constructor (props) {
		super(props);
		console.log('in addinfo constructor, props:', props)
		this.educationTitleInputRef = React.createRef();
		this.educationLocationInputRef = React.createRef();
		this.careerTitleInputRef = React.createRef();
		this.careerLocationInputRef = React.createRef();
		this.state = {
			profile: props.profile,
			newProfile: {
				career: {},
				education: {},
			},
		};
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
						label: this.skillInputRef.current.value,
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
		newSkillsList[index] = {label: this.state.profile.skills[index].label, proficiency: newRating};

		console.log('in updateSkill - newSkillList:', newSkillsList, 'state skillsList:', this.state.skillsList);

		this.setState({
			...this.state,
			profile: {
				...this.state.profile,
				skills: newSkillsList,
			},
		});
	}

	// This function removes a skill from the local state skills list by it's index
	removeSkill = (index) => {

		let newSkillsList = this.state.profile.skills.slice();
		newSkillsList.splice(index, 1);

		console.log('in removeSkill - newSkillList:', newSkillsList)

		this.setState({
			...this.state,
			profile: {
				...this.state.profile,
				skills: newSkillsList,
			},
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
				<div className="addInfoWrap">
					<h2>Add Information</h2>
					<br/>
					<TextField
						variant="outlined" 
						type='text'
						id='phoneNum'
						label="Phone Number"
						defaultValue={this.state.profile.designer ? this.state.profile.designer.phone : ''}
						onChange={(event) => this.handleInputChange(event, 'designer', 'phone')}
					/>
					<TextField 
						type='text'
						variant="outlined" 
						id='imgUrl'
						label="Profile Image URL"
						defaultValue={this.state.profile.designer ? this.state.profile.designer.photo : ''}
						onChange={(event) => this.handleInputChange(event, 'designer', 'photo')}
					/>
					<br/>
					<TextField 
						type='text'
						variant="outlined" 
						label="LinkedIn Page"
						id='linkedinUrl'
						onChange={(event) => this.handleInputChange(event, 'designer', 'linkedin')}
						defaultValue={this.state.profile.designer ? this.state.profile.designer.linkedin : ''}
					/>
					<br/>

					{/* This code was used when we intended to handle availability as subtractive */}
					{/* <label
						htmlFor='availability_hours'
						className='buildProfileLabel'
						>Hours Available per Week:
					</label>
					<TextField 
						type='text'
						id='availability_hours'
						onChange={(event) => this.handleInputChange(event, 'designer', 'availability_hours')}
						defaultValue={this.state.profile.designer ? this.state.profile.designer.availability_hours : ''}
					/>
					<br/>
					
					<label
						htmlFor='availability_hours'
						className='buildProfileLabel'
						>Available on Weekends?
					</label>
					<input 
						type='checkbox'
						id='availability_hours'
						onChange={(event) => this.handleInputChange(event, 'designer', 'availability_hours')}
						defaultValue={this.state.profile.designer.availability_hours}
					/>
					<br/> */}
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
					<button onClick={() => this.updateHistoryList('education')}>Add</button>
					<h4>Added Education</h4>
					<ul>
						{this.state.profile.education ? this.state.profile.education.map((row, index) => {
							return <li key={index}>{row.degree} from {row.location}</li>
						}) : ''}
					</ul>
					<br/>
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
					<button onClick={() => this.updateHistoryList('career')}>Add</button>
					<h4>Added Work Experience</h4>
					<ul>
						{this.state.profile.career ? this.state.profile.career.map((job, index) => {
							return <li key={index}>{job.title} at {job.location}</li>
						}) : ''}
					</ul>
					<br/>
					<button
						onClick={() => {this.props.saveAndNavigate('/DesignerHomeView', this.state.profile)}}
					>
						Save and Go Home
					</button>
					<button
						onClick={() => {this.props.saveAndNavigate('/UpdateProfile/Skills', this.state.profile)}}
					>
						Save and go to Skills
					</button>
				</div>
				<div className="addInfoWrap">
					<h2>Add Skills</h2>
					<h4>Software</h4>
					{this.state.profile.software ? this.state.profile.software.map((software, index) => {
						return (
							<>
								<input 
									type='checkbox'
									id={`software${index}`} 
									name={`software${index}`} 
									key={index} 
									value={software.label}
									checked={software.proficient}
									onChange={() => this.handleCheckboxChange(index)} 
								/>
								<label htmlFor={`software${index}`}>{software.label}</label>
								<br/>
							</>
						)
					}) : ''}
					<div className='skillsSection'>
						<label htmlFor='skillInput'>Enter Skill</label>
						<input type='text' name='skillInput' id='skillInput' className='skillsTextField' ref={this.skillInputRef} onChange={this.handleSkillInputChange} />
						<input type='button' id='addSkill' value='Add' onClick={this.addSkill} />
						{this.state.profile.skills ? this.state.profile.skills.map((skill, index) => {
							return <AddedSkillLabel 
										key={index} 
										index={index} 
										skill={skill} 
										removeSkill={this.removeSkill} 
										updateSkill={this.updateSkill} 
									/>
						}) : ''}
					</div>
					<br/>
					{/* <button
						onClick={() => {this.props.saveAndNavigate('/UpdateProfile/Info', this.state.profile)}}
					>Save and go to Information
					</button> */}
					<button
						onClick={() => {this.props.saveAndNavigate('/DesignerHomeView', this.state.profile)}}
					>Save and Go Home
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddInformation));