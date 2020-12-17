import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	HashRouter as Router,
	Route,
	withRouter
  } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps'
import NavButtonDesigner from './DesignerHomeComponents/NavButtonDesigner.js'
import Calendar from '././DesignerHomeComponents/Calendar.js'
import MyProfile from '././DesignerHomeComponents/MyProfile.js'
import Projects from '././DesignerHomeComponents/projects.js'


class DesignerHomeView extends Component {
	state = {

	};

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
                path: '/DesignerHomeView/projects', 
                label: 'Projects'
            },
           
		];
	
		return (
			<>
				<div>Designer Home</div>
					<Router>
						<div>Designer Home</div>
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
