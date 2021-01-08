import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import AddedSkillLabel from './AddedSkillLabel';

class AddSkills extends Component {
	
	constructor (props) {
		super(props);
		this.skillInputRef = React.createRef();
		this.state = {
			softwareList: [],
			profile: props.profile,
			currentSkillInput: '',
		};
	}

	componentDidMount = () => {
		this.props.dispatch({
			type: 'FETCH_PROFILE',
			payload: this.props.store.user.designer_id
		});
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

	render() {
		console.log('AddSkills - state:', this.state, '; props:', this.props);
		return (
			<>
				<h2>Add Skills</h2>
				<div className='sectionContainer'>
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
					<button
						onClick={() => {this.props.saveAndNavigate('/UpdateProfile/Info', this.state.profile)}}
					>Save and go to Information
					</button>
					<button
						onClick={() => {this.props.saveAndNavigate('/DesignerHomeView', this.state.profile)}}
					>Save and Go Home
					</button>
				</div>
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddSkills));