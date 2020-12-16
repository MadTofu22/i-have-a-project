import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

class Calendar extends Component {
	state = {

	};

	render() {
		return (
			<FullCalendar
				plugins={[ dayGridPlugin ]}
				initialView="dayGridMonth"
      		/>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(Calendar));
