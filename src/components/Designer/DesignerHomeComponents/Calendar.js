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
					dialog: 'Add Availability',
					id: 0,
					start: '',
					hoursCommitted: 0,
					renderModal: false,
					project_id: null
			}
		})
	}

	

// converts date format from FullCalendar passed as info from eventClick
	OpenCalendarEventModal = (info) => {
		console.log('infoevent', info.event);
		
		let eventInfo = {
			id: info.event.id,
			start: info.event.start.toISOString().slice(0, 10),
			hoursCommitted: info.event.extendedProps.hoursCommitted,
			renderModal: true,
			dialog: 'Edit Availability'
		}
		console.log('event info', eventInfo)
		this.setState({
			clickEvent: eventInfo
		})
	}

	render() {
		return (
			<div className="componentViewWrap">
				<AddCalendarEvent  
					closeClickEvent={this.closeClickEvent}
					clickEvent={this.state.clickEvent}
					designer={{id: this.props.store.user.designer_id}}
				/>
				<div className="calendarWrap">
					<FullCalendar
						plugins={[ dayGridPlugin ]}
						initialView="dayGridMonth"
						events={this.state.events}
						eventClick={(info) => this.OpenCalendarEventModal(info)}
					/>
				</div>
			</div>
			
		);
	}
}

export default withRouter(connect(mapStoreToProps)(Calendar));
