import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';



class AddSkills extends Component {
	
	constructor (props) {
		console.log('in constructor')
		super(props);
		this.skillInputRef = React.createRef();
		this.state = {
			softwareList: [],
			profile: props.profile,
			currentSkillInput: '',
		};
	}


	render() {
		console.log('AddSkills - state:', this.state, '; props:', this.props);
		return (
			<>
				
			</>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(AddSkills));