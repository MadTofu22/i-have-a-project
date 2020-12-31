import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import components
import AddSkills from './UpdateProfileComponents/AddSkills';
import AddInformation from './UpdateProfileComponents/AddInformation';

class UpdateProfile extends Component {
	
	state = {
		updatesMade: false,
		profileFetched: false,
		profile: {
			designer: {},
			career: [],
			certification: [],
			education: [],
		},
	};
	
	componentDidMount = () => {
		const profileData = {
			designer: this.props.store.profile.designer,
			career: this.props.store.profile.career,
			certification: this.props.store.profile.certification,
			education: this.props.store.profile.education,
		}
		this.setProfileData(profileData);
	}

	// This function handles updating the local state with changes that were made
	setProfileData = (profileData) => {
		this.setState({
			...this.state,
			profile: profileData,
		})
	}

	// This function handles marking the updatesMade flag to true
	updateProfileData = (profileData) => {
		this.setState({
			...this.state,
			updatesMade: true,
			profile: profileData
		});
	}

	// This function saves the profile data and navigates to the specified page
	saveAndNavigate = (path) => {
		if (this.state.updatesMade) {
			this.props.dispatch({type: 'UPDATE_PROFILE', payload: this.state.profile })
		}
		this.props.history.push(path)
	}

	render() {
		console.log('UpdateProfile component has rendered - this.state:', this.state);
		return (
			<Router>
				<h1>Build Your Perofile!</h1>
				<div className='profileInputContainer'>
					<Route exact path='/UpdateProfile/Skills'>
						<AddSkills 
							updateProfileData={this.updateProfileData}
							saveAndNavigate={this.saveAndNavigate}
							profile={this.state.profile}
						/>
					</Route>
					<Route exact path='/UpdateProfile/Info'>
						<AddInformation 
							updateProfileData={this.updateProfileData}
							saveAndNavigate={this.saveAndNavigate}
							profile={this.state.profile}
						/>
					</Route>
				</div>
			</Router>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(UpdateProfile));