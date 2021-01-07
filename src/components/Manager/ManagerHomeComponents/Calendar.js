import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../../App/Material-UI/MUITheme';
import '../Manager.css';

class ManagerCalendar extends Component {
    
    componentDidMount = () => {
        this.props.dispatch({ 
            type: "FETCH_MANAGER_CALENDAR"
        })
    }

    render () {
        return (
            <>
                <ThemeProvider theme={theme}>
                <h2 className='manager'>Designer Weekly Calendars</h2>
                   {this.props.store.managerCalendar.length > 0 ?
                        this.props.store.managerCalendar.map( (element) => {
                            console.log(element.designerInfo.first_name);
                                for (const event of element.calendar) {
                                    event['start'] = event.start.slice(0,10)
                                    event['title'] = event.name
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
                                <FullCalendar
                                    className='designerWeek'
                                    plugins={[dayGridPlugin]}
                                    initialView='dayGridWeek'
                                    height='20vh'
                                    dayMinWidth='5vw'
                                    events={element.calendar}
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