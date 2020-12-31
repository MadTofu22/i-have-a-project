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
			profile: props.profile,
			skillsList: [], // {label: '', rating: ''}
			saveDisabled: false,
			currentSkillInput: '',
		};
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
			skillsList: [...this.state.skillsList,
				{
					label: this.skillInputRef.current.value,
					rating: '3',
				}],
		});
		this.skillInputRef.current.value = '';	
	}

	// This function updates the local state skills list with User added skills and their ratings.
	updateSkill = (index, newRating) => {

		console.log('in updateSkill - index:', index, '; newRating:', newRating)

		let newSkillList = this.state.skillsList.slice();
		newSkillList[index] = {label: this.state.skillsList[index].label, rating: newRating};

		console.log('in updateSkill - newSkillList:', newSkillList, 'state skillsList:', this.state.skillsList);

		this.setState({
			...this.state,
			skillsList: newSkillList,
		});
	}

	// This function removes a skill from the local state skills list by it's index
	removeSkill = (index) => {

		let newSkillsList = this.state.skillsList.slice();
		newSkillsList.splice(index, 1);
		console.log('in removeSkill - newSkillList:', newSkillsList)
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
						<input type='text' name='skillInput' id='skillInput' className='skillsTextField' ref={this.skillInputRef} onChange={this.handleSkillInputChange} />
						<input type='button' id='addSkill' value='Add' onClick={this.addSkill} />
						{this.state.skillsList.map((skill, index) => {
							return <AddedSkillLabel key={index} index={index} skill={skill} removeSkill={this.removeSkill} updateSkill={this.updateSkill} />
						})}
					</div>
					<br/>
					<input type='submit' value='Save and go to Information' />
					<input type='submit' value='Save and go to Home' />
				</div>
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddSkills));