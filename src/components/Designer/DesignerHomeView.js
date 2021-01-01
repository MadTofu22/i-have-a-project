import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	HashRouter as Router,
	Route,
	withRouter
  } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps'
import NavButtonDesigner from './DesignerHomeComponents/NavButtonDesigner.js'
import Calendar from './DesignerHomeComponents/Calendar.js'
import MyProfile from '././DesignerHomeComponents/MyProfile.js'
import Projects from '././DesignerHomeComponents/Projects.js'


class DesignerHomeView extends Component {
	state = {

	};

	componentDidMount = () => {
		this.props.dispatch({
			type: 'FETCH_DESIGNER_PROJECTS',
			payload: this.props.store.user.id
		});
		this.props.dispatch({
			type: 'FETCH_PROFILE',
			payload: this.props.store.user.designer_id
		});
	}

	handleLogout = () => {
		this.props.dispatch({type: 'LOGOUT'});
	}

	render () {
        const pages = [
            {
                path: '/DesignerHomeView/MyProfile', 
                label: 'My Profile'
            },
            {
                path: '/DesignerHomeView/Calendar', 
                label: 'Calendar'
            },
            {
                path: '/DesignerHomeView/Projects', 
                label: 'Projects'
            },
           
		];
	
		return (
			<>
				<div>Designer Home</div>
					<Router>
						<button 
							className='headerBarButton' 
							onClick={() => this.props.history.push('/UpdateProfile')}
							>Update Profile
						</button>
						<button 
							className='headerBarButton' 
							onClick={() => this.handleLogout()}
							>Logout
						</button>
						<div className='designerNavBar'>
							{pages.map((page, index) => {
								return <NavButtonDesigner key={index} page={page} />
							})}
						</div>
						<Route
							exact
							path={`/DesignerHomeView/MyProfile`}
							component={MyProfile}
						/>
						<Route
							exact
							path={`/DesignerHomeView/Calendar`}
							component={Calendar}
						/>
						<Route
							exact
							path={`/DesignerHomeView/projects`}
							component={Projects}
						/>
					</Router>
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(DesignerHomeView));
