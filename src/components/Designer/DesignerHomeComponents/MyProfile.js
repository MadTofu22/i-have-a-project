import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import '../Designer.css'

class MyProfile extends Component {

	
	componentDidMount = () => {
		this.props.dispatch({type: 'FETCH_PROFILE'});
	}

	render() {
		return (
			<div className="componentViewWrap">
				<div className="myProfileWrap">
					<div className="left-ProfileColumn">
						
						<div className="profileImg">
							{this.props.store.profile.designer ?
								<img
									src={this.props.store.profile.designer.photo}
									alt="The User's avatar"
								></img>	
							:
								<img
									alt="No image added"
								></img>
							}
						</div>
						<div className="profileName">
							{this.props.store.user.first_name} {this.props.store.user.last_name}
						</div>
						<div className="profileContactInfo">
							<h2>Contact Info: </h2>
							<p>Email: {this.props.store.user ? this.props.store.user.email : ''}</p>
							<p>Phone: {this.props.store.profile.designer ? this.props.store.profile.designer.phone : ''}</p>
							<p>Linkedin URL: {this.props.store.profile.designer ? this.props.store.profile.designer.linkedin : ''}</p>
						</div>
						<div>
							<h2>Career History: </h2>
							{this.props.store.profile.career ?
								this.props.store.profile.career.map((career, index) => {
									return <p className='careerItem' key={index}>{career.title} at {career.location}</p>
								})
								:
								'No Career History Added'
							}
						</div>
						<div>
							<h2>Education:</h2>
							{this.props.store.profile.education ?
								this.props.store.profile.education.map((degree, index) => {
									return <p className='educationItem' key={index}>{degree.degree} at {degree.location}</p>
								})
								:
								'No Education History Added'
							}
						</div>
					</div>
					<div className="right-ProfileColumn">
							<div>
								<h2>Software:</h2>
								{this.props.store.profile.software ?
									this.props.store.profile.software.map((software, index) => {
										if (software.proficient) {
											return <p className='softwareItem' key={index}>{software.label}</p>
										}
									})
									:
									'No Proficient Software Listed'
								}
							</div>
							<div>
								<h2>Skills:</h2>
								{this.props.store.profile.skills ?
									this.props.store.profile.skills.map((skill, index) => {
										return <p className='skillItem' key={index}>{skill.label} - {skill.proficiency}/5</p>
									})
									:
									'No Additional Skills Added'
								}
							</div>
					</div>
				</div>
			</div>
		
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyProfile));
