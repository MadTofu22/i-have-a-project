import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../../App/Material-UI/MUITheme';
import '../Manager.css';

import AddCalendarEvent from '../../Designer/DesignerHomeComponents/AddCalendarEvent'

class ManagerCalendar extends Component {

    state = {
		events: [{
			id: 0,
			title: '',
			start: '',
			hoursCommitted: 0
		  }],
		clickEvent: {
				id: 0,
				start: '',
				hoursCommitted: 0,
				renderModal: true,
				project_id: null
		}
	};
    
    componentDidMount = () => {
        this.props.dispatch({ 
            type: "FETCH_MANAGER_CALENDAR"
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
		let eventInfo = {
			id: info.event.id,
			start: info.event.start.toISOString().slice(0, 10),
			hoursCommitted: info.event.extendedProps.hoursCommitted,
			renderModal: true,
			dialog: 'Edit Availability'
		}
		this.setState({
			clickEvent: eventInfo
		})
	}

    render () {
        return (
            <>
                <ThemeProvider theme={theme}>
                <h2 className='manager'>Designer Weekly Calendars</h2>
                   {this.props.store.managerCalendar.length > 0 ?
                        this.props.store.managerCalendar.map( (element) => {
                                for (const event of element.calendar) {
                                    event['id'] = event.event_id
                                    event['start'] = event.start.slice(0,10)
                                }                          
                            
                            return (
                                <div className='designerCalendarSection'>
                                <div className='designerInfoBlock'>
                                        <h2 className='designerNameHeader'>{element.designerInfo.first_name + ' ' + element.designerInfo.last_name}</h2>
                                    <Button variant="contained" color="primary" style={{ margin: 20 }}>
                                        View Profile</Button>
                                    <ul className='designerStatsLists'>
                                        <li>#Projects: {element.projects.length}</li>
                                        <li>Hours Available: 35</li>
                                        <li>Billable Rate: ${element.designerInfo.rate}</li>
                                    </ul>
                                </div>
                                <AddCalendarEvent 
                                    closeClickEvent={this.closeClickEvent}
                                    clickEvent={this.state.clickEvent}
                                    designer={{id: element.designerInfo.designer_id}}
                                />
                                <FullCalendar
                                    className='designerWeek'
                                    plugins={[dayGridPlugin]}
                                    initialView='dayGridWeek'
                                    height='200px'
                                    dayMinWidth='4vw'
                                    events={element.calendar}
                                    eventClick={(info) => this.OpenCalendarEventModal(info)}
                                />
                                </div>
                            )
                        })
                   :
                   <div>You don't have any Designers yet!</div>
                   }
               
                </ThemeProvider>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerCalendar));