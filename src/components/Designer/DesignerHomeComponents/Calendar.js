import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './Calendar.css'
import AddCalendarEvent from './AddCalendarEvent'

class Calendar extends Component {

	// Date Formatting - https://fullcalendar.io/docs/Calendar-formatDate
	state = {
		events: [{
			id: '1',
			title: 'my event',
			start: '2020-12-16',
			hoursToCommit: 4
		  },
		  {
			id: '2',
			title: 'event 2',
			start: '2020-12-16',
			hoursToCommit: 2
		  },
		  {
			id: '3',
			title: 'IT"S EASY',
			start: '2020-12-16',
			hoursToCommit: 7
		  }],
		ClickEvent: {
			eventInfo: {
				id: '',
				title: '',
				start: '',
				hoursToCommit: 0
			}
		}
	};
	OpenCalendarEventModal = (info) => {
		let eventInfo = {
			id: info.event.title,
			title: info.event.id,
			start: info.event.start,
			hoursToCommit: info.event.extendedProps.hoursToCommit
		}
		console.log(info);
		console.log(eventInfo);
		this.setState({
			ClickEvent: eventInfo
		})
	}

	render() {
		return (
			<div className="CalendarWrap">
				<AddCalendarEvent calendarClickEvent={this.state.ClickEvent}/>
				<FullCalendar
					plugins={[ dayGridPlugin ]}
					initialView="dayGridMonth"
					events={this.state.events}
					eventClick={(info) => this.OpenCalendarEventModal(info)}
      			/>
			</div>
			
		);
	}
}

export default withRouter(connect(mapStoreToProps)(Calendar));
