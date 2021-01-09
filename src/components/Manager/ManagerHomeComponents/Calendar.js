import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../../App/Material-UI/MUITheme';
import '../Manager.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Divider from '@material-ui/core/Divider'

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
		});
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
    
    // This fucnction gets todays date in a format that can be compared to an event date
    getTodaysDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        return `${dd}-${mm}-${yyyy}`
    }

    // This function takes in a calendar event date and compares it to todays date to see if the hours committed should be added.
    isDateValid = (eventDate) => {
        let today = this.getTodaysDate();
        
        if (Number(eventDate.slice(0,4)) < Number(today.slice(6,10))) { // compare year for each date
            console.log('in isValidDate year check event:', Number(eventDate.slice(0,4)), '< today:',Number(today.slice(6,10)), 'is true');
            return false;
        } else if (Number(eventDate.slice(0,4)) > Number(today.slice(6,10))) { 
            return true;
        } else {
            console.log('in isValidDate year check event:', Number(eventDate.slice(0,4)), '< today:',Number(today.slice(6,10)), 'is false');
            if (Number(eventDate.slice(5,7)) < Number(today.slice(3,5))) { // compare month for each date
                console.log('in isValidDate month check event:', Number(eventDate.slice(5,7)), '< today:',Number(today.slice(3,5)), 'is true');
                return false;
            } else if (Number(eventDate.slice(5,7)) > Number(today.slice(3,5))) { 
                return true;
            } else {
                console.log('in isValidDate month check event:', Number(eventDate.slice(5,7)), '< today:',Number(today.slice(3,5)), 'is false');
                if (Number(eventDate.slice(8,10)) < Number(today.slice(0,2))) { // compare day for each date
                    console.log('in isValidDate day check event:', Number(eventDate.slice(8,10)), '< today:',Number(today.slice(0,2)), 'is true');
                    return false;
                } else {
                    console.log('in isValidDate day check event:', Number(eventDate.slice(8,10)), '< today:',Number(today.slice(0,2)), 'is false');
                    return true; // eventDate >= today
                }
            }
        }
    }

    render () {
        return (
            <div className="componentViewWrap">
                <ThemeProvider theme={theme}>
                <h2 className='pageTitle'>Designer Weekly Calendars</h2>
                   {this.props.store.managerCalendar.length > 0 ?
                        this.props.store.managerCalendar.map( (element) => {
                            let totalAvailability = 0;
                            let today = this.getTodaysDate();
                            
                            for (const event of element.calendar) {
                                event['id'] = event.event_id
                                event['start'] = event.start.slice(0,10)
                                console.log('in manager calendar, today =', today, '; event date =', event.start.slice(0,10));
                                if (this.isDateValid(event.start.slice(0, 10))) {
                                    totalAvailability += event.hoursCommitted;
                                }
                            }
                            
                            return (
                                <div className='designerCalendarSection'>
                                <div className='designerInfoBlock'>
                                        <h2 className='designerNameHeader'>{element.designerInfo.first_name + ' ' + element.designerInfo.last_name}</h2>
                                    
                                     <List component="nav" aria-label="main mailbox folders">
                                        <ListItem>
                                        <PermIdentityIcon />
                                            <Button>
                                                <ListItemText>
                                                    View Profile
                                                </ListItemText>
                                            </Button>
                                        </ListItem>
                                            <Divider  variant="middle" />
                                        <ListItem>
                                            <Button>
                                                <AddCalendarEvent 
                                                    closeClickEvent={this.closeClickEvent}
                                                    clickEvent={this.state.clickEvent}
                                                    designer={{id: element.designerInfo.designer_id}}
                                                />
                                            </Button>
                                        </ListItem>
                                            <Divider  variant="middle" />
                                        <ListItem>
                                            <ListItemText>
                                                # of Projects Assigned: {element.projects.length}
                                            </ListItemText> 
                                        </ListItem>
                                            <Divider  variant="middle" />
                                        <ListItem>
                                            <ListItemText>
                                                Total Hours Available: {totalAvailability}
                                            </ListItemText>
                                        </ListItem>
                                            <Divider  variant="middle"/>
                                        <ListItem>
                                            <ListItemText>
                                                Billable Rate: ${element.designerInfo.rate}
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className="managerCalendarWrap">
                                <FullCalendar
                                    className='designerWeek'
                                    plugins={[dayGridPlugin]}
                                    initialView='dayGridWeek'
                                    height='240px'
                                    dayMinWidth='6vw'
                                    events={element.calendar}
                                    eventClick={(info) => this.OpenCalendarEventModal(info)}
                                />
                                </div>
                                </div>
                            )
                        })
                   :
                   <div>You don't have any Designers yet!</div>
                   }
               
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerCalendar));