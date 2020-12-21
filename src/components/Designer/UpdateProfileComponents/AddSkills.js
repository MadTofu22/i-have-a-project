import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddSkills extends Component {
	state = {
		softwareList: ['Software 1', 'Software 2', 'Software 3', 'Software 4', 'Software 5'],
	};

	render() {
		return (
			<>
				<h2>Add Skills</h2>
				<div className='sectionContainer'>
					<h4>Software</h4>
					<form id='softwareSelectionForm'>
						{this.state.softwareList.map((item, index) => {
							return (
								<>
									<input type='checkbox' id={`software${index}`} name={`software${index}`} value={index}/>
									<label htmlFor={`software${index}`}>{item}</label>
									<br/>
								</>
							)
						})}
					</form>
				</div>
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddSkills));