import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import AddedSkillLabel from './AddedSkillLabel';

class AddSkills extends Component {
	
	state = {
		softwareList: ['Software 1', 'Software 2', 'Software 3', 'Software 4', 'Software 5'],
		selectedSoftware: [],
		skillsList: [
			{
				label: 'Communication',
				rating: '1',
			},
		],
		saveDisabled: false,
	};

	// This fucntion saves the input info and stores it to the redux state, then passes it to the server/database
	handleFormSubmit = (event) => {
		console.log('skill form save clicked:', event.target);

	}

	// This function toggles the Save button enabled or disabled
	enableSave = () => {

		if (this.state.saveDisabled) {
			this.setState({
				...this.state,
				saveDisabled: !this.state.saveDisabled
			});
		}
	}

	// This function updates the local state skills list with User added skills and their ratings.
	updateSkill = (name, rating) => {

	}

	// This function removes a skill from the local state skills list by it's index
	removeSkill = (index) => {
		let newSkillsList = [];
		for (let skillIndex in this.state.skillsList) {
			if (index !== Number(skillIndex)) {
				newSkillsList.push(this.state.skillsList[skillIndex])
			}
			console.log('removed skillIndex:', Number(skillIndex))
		}
		console.log('in removeSkill, index:', index, '; newSkillsList:', newSkillsList)
		this.setState({
			...this.state,
			skillsList: newSkillsList,
		});
	}

	render() {
		console.log('AddSkills:', this)
		return (
			<>
				<h2>Add Skills</h2>
				<div className='sectionContainer'>
					<h4>Software</h4>
					<form id='softwareSelectionForm' onSubmit={this.handleFormSubmit}>
						{this.state.softwareList.map((item, index) => {
							return (
								<>
									<input type='checkbox' id={`software${index}`} name={`software${index}`} value={index} onChange={this.enableSave} />
									<label htmlFor={`software${index}`}>{item}</label>
									<br/>
								</>
							)
						})}
						<div className='skillsSection'>
							<label htmlFor='skillInput'>Enter Skill</label>
							<input type='text' name='skillInput' id='skillInput' className='skillsTextField' />
							<input type='button' id='addSkill' value='Add' />
							{this.state.skillsList.map((skill, index) => {
								return <AddedSkillLabel key={index} index={index} skill={skill} removeSkill={this.removeSkill} updateSkill={this.updateSkill} />
							})}
						</div>
						<br/>
						<input type='submit' disabled={this.state.saveDisabled} value='Save' />
					</form>
				</div>
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddSkills));