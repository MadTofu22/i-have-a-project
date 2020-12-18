import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddInformation extends Component {
	state = {
		eductionHistory: ['MCTC', 'Prime Digital Academy', 'University of Michigan'],
		workHistory: ['I Have a Project', 'Activision', 'Endeavor'],
	};

	render() {
		return (
			<>
				<h2>Add Information</h2>
				<label
					htmlFor='imgUrl'
					className='buildProfileLabel'
				>
					Profile Image:
				</label>
				<input 
					type='text'
					id='imgUrl'
				/>
				<br/>
				<label
					htmlFor='linkedinUrl'
					className='buildProfileLabel'
				>
					LinkedIn Page:
				</label>
				<input 
					type='text'
					id='linkedinUrl'
				/>
				<br/>
				<label
					htmlFor='educationItem'
					className='buildProfileLabel'
				>
					Education:
				</label>
				<input 
					type='text'
					id='educationItem'
				/>
				<button>Add</button>
				<h4>Added Education</h4>
				<ul>
					{this.state.eductionHistory.map(item => {
						return <li>{item}</li>
					})}
				</ul>
				<br/>
				<label
					htmlFor='workItem'
					className='buildProfileLabel'
				>
					Work Experience:
				</label>
				<input 
					type='text'
					id='workItem'
				/>
				<button>Add</button>
				<h4>Added Work Experience</h4>
				<ul>
					{this.state.workHistory.map(item => {
						return <li>{item}</li>
					})}
				</ul>
				<br/>
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddInformation));