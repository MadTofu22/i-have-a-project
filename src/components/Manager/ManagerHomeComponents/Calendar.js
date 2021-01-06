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
    
    state = {

    }

    render () {
        return (
            <>
                <ThemeProvider theme={theme}>
                <div className='managerCalendarSection'>
                    {/* <h2 className='manager'>My Calendar</h2> */}
                    <FullCalendar
                        className='managerMonth'
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        height='50vh'
                    />
                </div>
                <h2 className='manager'>Designer Weekly Calendars</h2>
                <div className='designerCalendarSection'>
                    <div className='designerInfoBlock'>
                        <h2 className='designerNameHeader'>Designer Name</h2>
                        <Button variant="contained" color="primary" style={{ margin: 20 }}>
                            View Profile</Button>
                        <ul className='designerStatsLists'>
                            <li>#Projects: 3</li>
                            <li>Hours Available: 35</li>
                            <li>Hours Scheduled: 0</li>
                            <li>Billable Rate: $55</li>
                        </ul>
                    </div>
                    <FullCalendar
                        className='designerWeek'
                        plugins={[dayGridPlugin]}
                        initialView='dayGridWeek'
                        height='20vh'
                        dayMinWidth='5vw'
                    />
                </div>
                <div className='designerCalendarSection'>
                    <div className='designerInfoBlock'>
                        <h2 className='designerNameHeader'>Designer Name</h2>
                        <Button variant="contained" color="primary" style={{ margin: 20 }}>
                            View Profile</Button>
                        <ul className='designerStatsLists'>
                            <li>#Projects: 3</li>
                            <li>Hours Available: 35</li>
                            <li>Hours Scheduled: 0</li>
                            <li>Billable Rate: $55</li>
                        </ul>
                    </div>
                    <FullCalendar
                        className='designerWeek'
                        plugins={[dayGridPlugin]}
                        initialView='dayGridWeek'
                        height='20vh'
                        dayMinWidth='5vw'
                    />
                </div>
                <div className='designerCalendarSection'>
                    <div className='designerInfoBlock'>
                        <h2 className='designerNameHeader'>Designer Name</h2>
                        <Button variant="contained" color="primary" style={{ margin: 20 }}>
                            View Profile</Button>
                        <ul className='designerStatsLists'>
                            <li>#Projects: 3</li>
                            <li>Hours Available: 35</li>
                            <li>Hours Scheduled: 0</li>
                            <li>Billable Rate: $55</li>
                        </ul>
                    </div>
                    <FullCalendar
                        className='designerWeek'
                        plugins={[dayGridPlugin]}
                        initialView='dayGridWeek'
                        height='20vh'
                        dayMinWidth='5vw'
                    />
                </div>
                </ThemeProvider>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerCalendar));