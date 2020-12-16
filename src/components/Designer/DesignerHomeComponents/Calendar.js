import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './Calendar.css'
import AddCalendarEvent from './AddCalendarEvent'

class Calendar extends Component {
	state = {
		events: [{
			id: 'a',
			title: 'my event',
			start: '2020-12-16'
		  },
		  {
			id: 'a',
			title: 'event 2',
			start: '2020-12-16'
		  },
		  {
			id: 'a',
			title: 'IT"S EASY',
			start: '2020-12-16'
		  }]
	};

	render() {
		return (
			<div className="CalendarWrap">
				<AddCalendarEvent />
				<FullCalendar
					plugins={[ dayGridPlugin ]}
					initialView="dayGridMonth"
					events={this.state.events}
      			/>
			</div>
			
		);
	}
}

export default withRouter(connect(mapStoreToProps)(Calendar));
