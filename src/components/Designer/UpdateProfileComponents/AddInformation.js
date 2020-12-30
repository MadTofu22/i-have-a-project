import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddInformation extends Component {

	constructor (props) {
		super(props);
		this.workHistoryInputRef = React.createRef();
		this.educationHistoryInputRef = React.createRef();
		this.state = {
			educationHistory: ['MCTC', 'Prime Digital Academy', 'University of Michigan'],
			workHistory: ['I Have a Project', 'Activision', 'Endeavor'],
			workHistoryInput: '',
			educationHistoryInput: '',
			linkedinPath: '',
			avatarPath: '',
			phoneNum: '',
		};
	}

	componentDidMount = () => {
		if (this.props.store.profile.designer) {
			this.setState({
				...this.state,
				phoneNum: this.props.store.profile.designer[0].phone
			})
		}
	}

	// This function handles storing the work and education history inputs in the local state on change
	handleInputChange = (event, inputType) => {

		console.log('in handleInputChange - inputType:', inputType, '; inputValue:', event.target.value);
		this.setState({
			...this.state,
			[inputType]: event.target.value,
		})
	}

	// This function handles adding an item to the education or work history list
	updateHistoryList = (listType) => {

		let refType = listType + 'InputRef';
		let inputType = listType + 'Input';
		this.setState({
			...this.state,
			[listType]: [...this.state[listType], this.state[inputType]],
		});
		this[refType].current.value = '';
	}

	render() {
		return (
			<>
				<h2>Add Information</h2>
				<br/>
				<label
					htmlFor='phoneNum'
					className='buildProfileLabel'
					defaultValue={this.state.phoneNum}
				>
					Cell Number:
				</label>
				<input
					type='text'
					id='phoneNum'
				/>
				<label
					htmlFor='imgUrl'
					className='buildProfileLabel'
				>
					Profile Image:
				</label>
				<input 
					type='text'
					id='imgUrl'
					onChange={(event) => this.handleInputChange(event, 'avatarPath')}
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
					onChange={(event) => this.handleInputChange(event, 'linkedinPath')}
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
					ref={this.historyInputRef}
					onChange={(event) => this.handleInputChange(event, 'educationHistoryInput')}
				/>
				<button onClick={() => this.updateHistoryList('educationHistory')}>Add</button>
				<h4>Added Education</h4>
				<ul>
					{this.state.educationHistory.map(item => {
						return <li key={item}>{item}</li>
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
					ref={this.historyInputRef}
					onChange={(event) => this.handleInputChange(event, 'workHistoryInput')}
				/>
				<button onClick={() => this.updateHistoryList('workHistory')}>Add</button>
				<h4>Added Work Experience</h4>
				<ul>
					{this.state.workHistory.map(item => {
						return <li key={item}>{item}</li>
					})}
				</ul>
				<br/>
				<button
					onClick={() => {this.props.history.push('/DesignerHomeView')}}
				>
					Save and Go Home
				</button>
				<button
					onClick={() => {this.props.history.push('/UpdateProfile/Skills')}}
				>
					Save and go to Skills
				</button>
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddInformation));