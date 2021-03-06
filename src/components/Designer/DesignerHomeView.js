import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	HashRouter as Router,
	Redirect,
	Route,
	withRouter
  } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps'
import Calendar from './DesignerHomeComponents/Calendar.js'
import MyProfile from '././DesignerHomeComponents/MyProfile.js'
import Projects from '././DesignerHomeComponents/Projects.js'
import ProjectDetails from '../Projects/ProjectDetails';
import NavButton from '../Manager/ManagerHomeComponents/NavButton';
import PasswordUpdate from '../Modals/PasswordUpdate'


import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'


class DesignerHomeView extends Component {
	state = {

	};

	componentDidMount = () => {
		this.props.dispatch({
			type: 'FETCH_DESIGNER_PROJECTS',
			payload: this.props.store.user.designer_id
		});
		this.props.dispatch({
			type: 'FETCH_PROFILE',
			payload: this.props.store.user.designer_id
		});
	}

	// Handles logging out the user 
	handleLogout = () => {
		this.props.history.push('/Login');
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
			<div className="">
				<div className="designerNavBar">
						<h2 
							className="titleWrap"
							onClick={()=> this.props.history.push('/home')}
							>I Have A Project</h2>
                        <Divider className="menuDivider"  variant="middle"/>
							{pages.map((page, index) => {
								return <NavButton key={index} page={page} />
							})}
						
						<Divider className="menuDivider"  variant="middle"/>
                        <Button onClick={() => this.props.history.push('/UpdateProfile')} className='headerButton'>Update Profile</Button>
						<PasswordUpdate/>
                        <Button 
							className='headerButton' 
							onClick={() => this.handleLogout()}
							>Logout
						</Button>
					</div>
					<div className="designerView">
					<Router>
						
						<Redirect exact path='/DesignerHomeView' to='/DesignerHomeView/MyProfile' />
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
						<Route
							exact
							path={`/DesignerHomeView/ProjectDetails/:project_id`}
							component={ProjectDetails}
						/>
					</Router>
					</div>
			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(DesignerHomeView));
