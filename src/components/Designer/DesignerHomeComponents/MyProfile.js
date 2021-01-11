import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider'

import '../Designer.css'

class MyProfile extends Component {
	
	componentDidMount = () => {
		this.props.dispatch({type: 'FETCH_PROFILE', payload: this.props.store.user.designer_id});
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
						<br/>
						<Divider className="menuDivider"  variant="middle"/>
						<div className="profileContactInfo">
							<div className="sectionHeader">Contact Info: </div>
							<div className="sectionList">
								<p>Email: {this.props.store.user ? this.props.store.user.email : ''}</p>
								<p>Phone: {this.props.store.profile.designer ? this.props.store.profile.designer.phone : ''}</p>
								<p>Linkedin URL: {this.props.store.profile.designer ? this.props.store.profile.designer.linkedin : ''}</p>
							</div>
						</div>
						<div>
							<div className='sectionHeader'>Career History: </div>
								<div className="sectionList">
									{this.props.store.profile.career ?
									this.props.store.profile.career.map((career, index) => {
										return <p className='careerItem' key={index}>{career.title} at {career.location}</p>
									})
									:
									'No Career History Added'
									}
								</div>
						</div>
						<div>
							<div className='sectionHeader'>Education:</div>
								<div className="sectionList">
							{this.props.store.profile.education ?
								this.props.store.profile.education.map((degree, index) => {
									return <p className='educationItem' key={index}>{degree.degree} at {degree.location}</p>
								})
								:
								<p>No Education History Added</p>
							}
								</div>
						</div>
					</div>
					<div className="right-ProfileColumn">
							<div >
								<div  className='sectionHeader'>Software:</div>
									<div className="sectionList">
										{this.props.store.profile.software ?
										this.props.store.profile.software.map((software, index) => {
											if (software.proficient) {
												return <p className='softwareItem' key={index}>{software.label}</p>
											}
										})
										:
										<p>No Proficient Software Listed</p>
										}
									</div>						
							</div>
							<div>
								<div className='sectionHeader'>Skills:</div>
										<br/>
										<div className="sectionList" style={{overflow: 'scroll'}}>
								{this.props.store.profile.skills ?
									this.props.store.profile.skills.map((skill) => {
										return (<div key={skill.id}>
												<Typography gutterBottom>
													{skill.label}
												</Typography>
												<Slider 
													style={{width: '90%'}}
													value={skill.proficiency}
													step={1}
													marks
													min={1}
													max={5}  
												/>
												</div>)
					
									})
									:
									<p>No Additional Skills Added</p>
								}
								 </div>
							</div>
					</div>
				</div>
			</div>
		
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyProfile));
