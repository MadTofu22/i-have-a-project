import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../Manager.css';

class ManagerCalendar extends Component {
    
    state = {

    }

    render () {
        return (
            <>
                <div className='managerCalendarSection'>
                    <h3>My Calendar</h3>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        height='50vh'
                    />
                </div>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ManagerCalendar));