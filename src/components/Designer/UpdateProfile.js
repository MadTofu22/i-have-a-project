import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import components
import AddSkills from './UpdateProfileComponents/AddSkills';
import AddInformation from './UpdateProfileComponents/AddInformation';

class UpdateProfile extends Component {
	state = {

	};

	componentDidUpdate () {
		this.props.dispatch({type: 'FETCH_PROFILE'});
	}

	// This function saves the profile data and navigates to the specified page
	saveAndNavigate = (path) => {
		
	}

	render() {
		return (
			<Router>
				<h1>Build Your Profile!</h1>
				{JSON.stringify(this.props.store.profile)}
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