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
			id: 0,
			title: '',
			start: '',
			hoursCommitted: 0
		  }],
		clickEvent: {
				dialog: 'Add New Event',
				id: 0,
				title: '',
				start: '',
				hoursCommitted: 0,
				renderModal: true
		}
	};
	componentDidUpdate = () => {
		if (this.props.store.calendar[0].id !== this.state.events[0].id) {
			console.log(this.props.store.calendar);
			this.setState({
				events: this.props.store.calendar
			});
		}
	}

	componentDidMount = () => {
		this.props.dispatch({
			type: 'FETCH_CALENDAR_EVENTS_BY_ID'
		})
	}
	closeClickEvent = () => {
		this.setState({
			clickEvent: {
					dialog: 'Add New Event',
					id: 0,
					title: '',
					start: '',
					hoursCommitted: 0,
					renderModal: false
			}
		})
	}

	

// converts date format from FullCalendar passed as info from eventClick
	OpenCalendarEventModal = (info) => {
		let eventInfo = {
			id: Number(info.event.id),
			title: info.event.title,
			start: new Intl.DateTimeFormat('en-US').format(info.event.start),
			hoursCommitted: info.event.extendedProps.hoursCommitted,
			renderModal: true,
			dialog: 'Edit Event'
		}
		console.log('in calendarjs', eventInfo)

		this.setState({
			clickEvent: eventInfo
		})
	}

	render() {
		return (
			<div className="CalendarWrap">
	
					<AddCalendarEvent  
						closeClickEvent={this.closeClickEvent}
						clickEvent={this.state.clickEvent}
					/>
				
				
				{JSON.stringify(this.props.store)}
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
