import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddSkills extends Component {
	state = {
		softwareList: ['Software 1', 'Software 2', 'Software 3', 'Software 4', 'Software 5'],
		selectedSoftware: [],
		saveDisabled: false,

	};

	handleFormSubmit = (event) => {
		
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

	render() {
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