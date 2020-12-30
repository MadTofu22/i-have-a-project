import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import components
import AddSkills from './UpdateProfileComponents/AddSkills';
import AddInformation from './UpdateProfileComponents/AddInformation';

class UpdateProfile extends Component {
	
	state = {
		profileFetched: false,
		designer: {}
	};

	componentDidMount = () => {
		this.getProfileData();
	}

	// This function gets the profile data from the database and stores it to the redux store
	getProfileData = () => {
		this.props.dispatch({type: 'FETCH_PROFILE'});
		this.setState({
			profileFetched: true,
			designer: this.props.store.profile.designer,
		});
	}

	// This function saves the profile data and navigates to the specified page
	saveAndNavigate = (path) => {
		
	}

	render() {
		return (
			<Router>
				<h1>Build Your Profile!</h1>
				{JSON.stringify(this.state)}
				<div className='profileInputContainer'>
					<Route 
						exact
						path='/UpdateProfile/Skills'
						component={AddSkills}
					/>
					<Route 
						exact
						path='/UpdateProfile/Info'
						component={AddInformation}
					/>
				</div>
			</Router>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(UpdateProfile));