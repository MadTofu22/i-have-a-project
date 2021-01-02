import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddInformation extends Component {

	constructor (props) {
		super(props);
		console.log('in addinfo constructor, props:', props)
		this.educationTitleInputRef = React.createRef();
		this.educationLocationInputRef = React.createRef();s
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


	handleHistoryInputChange = (event, section, property) => {

		this.setState({
			...this.state,
			newProfile: {
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
			<>
				<h2>Add Information</h2>
				{JSON.stringify(this.state.profile)}
				<br/>
				<label
					htmlFor='phoneNum'
					className='buildProfileLabel'
				>Phone Number:
				</label>
				<input
					type='text'
					id='phoneNum'
					defaultValue={this.state.profile.designer.phone}
					onChange={(event) => this.handleInputChange(event, 'designer', 'phone')}
				/>
				<label
					htmlFor='imgUrl'
					className='buildProfileLabel'
				>Profile Image URL:
				</label>
				<input 
					type='text'
					id='imgUrl'
					defaultValue={this.state.profile.designer.photo}
					onChange={(event) => this.handleInputChange(event, 'designer', 'photo')}
				/>
				<br/>
				<label
					htmlFor='linkedinUrl'
					className='buildProfileLabel'
					>LinkedIn Page:
				</label>
				<input 
					type='text'
					id='linkedinUrl'
					onChange={(event) => this.handleInputChange(event, 'designer', 'linkedin')}
					defaultValue={this.state.profile.designer.linkedin}
				/>
				<br/>
				<label
					htmlFor='educationDegree'
					className='buildProfileLabel'
				>Degree:
				</label>
				<input 
					type='text'
					id='educationDegree'
					ref={this.educationTitleInputRef}
					onChange={(event) => this.handleHistoryInputChange(event, 'education', 'degree')}
				/>
				<label
					htmlFor='educationDegree'
					className='buildProfileLabel'
				>Institution:
				</label>
				<input 
					type='text'
					id='educationLocation'
					ref={this.educationLocationInputRef}
					onChange={(event) => this.handleHistoryInputChange(event, 'education', 'location')}
				/>
				<button onClick={() => this.updateHistoryList('education')}>Add</button>
				<h4>Added Education</h4>
				<ul>
					{this.state.profile.education.map((row, index) => {
						return <li key={index}>{row.degree} from {row.location}</li>
					})}
				</ul>
				<br/>
				<label
					htmlFor='careerTitle'
					className='buildProfileLabel'
				>
					Position:
				</label>
				<input 
					type='text'
					id='careerTitle'
					ref={this.careerTitleInputRef}
					onChange={(event) => this.handleHistoryInputChange(event, 'career', 'title')}
				/>
				<label
					htmlFor='careerTitle'
					className='buildProfileLabel'
				>
					Company:
				</label>
				<input 
					type='text'
					id='careerLocation'
					ref={this.careerLocationInputRef}
					onChange={(event) => this.handleHistoryInputChange(event, 'career', 'location')}
				/>
				<button onClick={() => this.updateHistoryList('career')}>Add</button>
				<h4>Added Work Experience</h4>
				<ul>
					{this.state.profile.career.map((job, index) => {
						return <li key={index}>{job.title} at {job.location}</li>
					})}
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
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddInformation));