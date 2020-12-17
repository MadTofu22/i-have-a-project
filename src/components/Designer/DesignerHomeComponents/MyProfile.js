import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

class MyProfile extends Component {
	state = {
		profile: {
			photo: '',
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			rate: '',
			linkedin: '',
			career: [{
				start_date: '',
				end_date: '',
				title: ''
			}],
			education: [{
				graduation_date: '',
				degree: '',
			}],
			certification: [{
				graduation_date: '',
				certification: ''
			}],
			skills: [{
				label: '',
				proficiency: ''
			}],
			availability: [{
				
			}]
		}
	};
	

	render() {
		return (
			<div className="myProfileWrap">
				<div className="left-ProfileColumn">
					<div>
						Hello, {this.state.profile.first_name, ' ',  this.state.profile.last_name}
					</div>
					<div className="profileImg">

					</div>
					<div>
						contact Info: 
						<p>{this.state.profile.email}</p>
						<p>{this.state.profile.phone}</p>
						<p>{this.state.profile.linkedin}</p>
					</div>
					<div>
						Career History: 
						{this.state.profile.career.map( career => {
							<p>{JSON.stringify(career)}</p>
						})}
					</div>
					<div>
						Education: 
						{this.state.profile.education.map( school => {
							<p>{JSON.stringify(school)}</p>
						})}
					</div>
					<div>
						Certifications: 
						{this.state.profile.certification.map( cert => {
							<p>{JSON.stringify(cert)}</p>
						})}
					</div>
				</div>
				<div className="rightProfileColumn">

				</div>
			</div>
		
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyProfile));
