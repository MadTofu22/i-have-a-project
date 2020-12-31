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
				renderModal: true,
				project_id: null
		}
	};
	componentDidUpdate = () => {
		if (this.props.store.calendar !== this.state.events) {
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
					renderModal: false,
					project_id: null
			}
		})
	}

	

// converts date format from FullCalendar passed as info from eventClick
	OpenCalendarEventModal = (info) => {
		let eventInfo = {
			id: Number(info.event.id),
			title: info.event.title,
			start: info.event.start.toISOString().slice(0, 10),
			hoursCommitted: info.event.extendedProps.hoursCommitted,
			project_id: info.event.extendedProps.project_id,
			renderModal: true,
			dialog: 'Edit Event'
		}
		console.log('event info', eventInfo)
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
