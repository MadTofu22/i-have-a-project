import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import AddedSkillLabel from './AddedSkillLabel';

class AddSkills extends Component {
	
	state = {
		softwareList: [
			{
				name: 'Software 1',
				checkedState: false,
			},
			{
				name: 'Software 2',
				checkedState: false,
			},
			{
				name: 'Software 3',
				checkedState: false,
			},
			{
				name: 'Software 4',
				checkedState: false,
			},
			{
				name: 'Software 5',
				checkedState: false,
			},
		],
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
		event.preventDefault();
		console.log('skill form save clicked:', event.target);


	}

	// This function marks the state for the selected software as checked and toggles the save button enabled
	handleCheckboxChange = (index) => {

		let newSoftwareList = this.state.softwareList;
		newSoftwareList[index].checkedState = true;

		this.setState({
			...this.state,
			softwareList: newSoftwareList,
			saveDisabled: false
		});
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
		console.log('AddSkills - state:', this.state, '; props:', this.props);
		return (
			<>
				<h2>Add Skills</h2>
				<div className='sectionContainer'>
					<h4>Software</h4>
					<form id='softwareSelectionForm' onSubmit={this.handleFormSubmit}>
						{this.state.softwareList.map((item, index) => {
							return (
								<>
									<input 
										type='checkbox' 
										id={`software${index}`} 
										name={`software${index}`} 
										value={index}
										checked={item.checkedState}
										onChange={() => this.handleCheckboxChange(index)} 
									/>
									<label htmlFor={`software${index}`}>{item.name}</label>
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