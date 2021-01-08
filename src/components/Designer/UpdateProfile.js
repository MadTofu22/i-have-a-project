import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import components
import AddSkills from './UpdateProfileComponents/AddSkills';
import AddInformation from './UpdateProfileComponents/AddInformation';

class UpdateProfile extends Component {
	
	state = {
		profile: this.props.store.profile,
	};

	componentDidMount = () => {

		this.props.dispatch({
			type: 'FETCH_PROFILE',
			payload: this.props.store.user.designer_id
		});
		this.setState({
			profile: this.props.store.profile,
		});
	}
	setData = () => {
		console.log('setting data in update profile')
		this.setState({
			profile: this.props.store.profile,
		});
	}

	// This function saves the profile data and navigates to the specified page
	saveAndNavigate = (path, newData) => {
		const profileData = {
			designer_id: this.props.store.user.designer_id,
			oldData: this.props.store.profile,
			newData,
		}
		
		console.log('in saveAndNavigate - profileData', profileData);
		this.props.dispatch({type: 'UPDATE_PROFILE', payload: profileData});
		this.props.history.push(path);
	}

	render() {
		console.log('UpdateProfile component has rendered - this.state:', this.state);
		return (
			this.props.store.profile.skills ?
			<Router>
				<h1>Build Your Profile!</h1>
				<div className='profileInputContainer'>
					{/* <Route exact path='/UpdateProfile/Skills'>
						<AddSkills 
							saveAndNavigate={this.saveAndNavigate}
							profile={this.props.store.profile}
						/>
					</Route> */}
					<Route exact path='/UpdateProfile/Info'>
						<AddInformation
							saveAndNavigate={this.saveAndNavigate}
							profile={this.props.store.profile}
						/>
					</Route>
				</div>
			</Router>
			:
			<h1>Profile Data Loading{this.setData}</h1>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(UpdateProfile));