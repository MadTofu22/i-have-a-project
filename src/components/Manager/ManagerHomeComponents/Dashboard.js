import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import {DataGrid} from '@material-ui/data-grid';
import { buildClassNameNormalizer } from '@fullcalendar/react';


class Dashboard extends Component {
    
    state = {
        projectsData: { // Table data for the projects at a glance table. This will be replaced with redux later
            columns: [
                {
                    field: 'id',
                    headerName: '#',
                    width: 42,
                },
                {
                    field: 'name', // Name of the project
                    headerName: 'Project Name',
                    width: 124,
                },
                {
                    field: 'numDesigers', // Total number of designers assigned to the project
                    headerName: '# Designers',
                    // width: 56,
                },
                {
                    field: 'hrsScheduled', // Total number of hours scheduled for this project across all designers
                    headerName: 'Scheduled',
                    // width: 56,
                },
                {
                    field: 'hrsRequired', // Total number of required hours estimated to be completed for this project
                    headerName: 'Required',
                    // width: 56,
                },
                {
                    field: 'hrsAvailable', // Total number of hours all assigned developers have available
                    headerName: 'Available',
                    // width: 56,
                },
                {
                    field: 'hrsActual', // Actual number of hours that were worked on this project, this is 0 if the project is not completed
                    headerName: 'Worked',
                    // width: 56,
                },
                {
                    field: 'status',
                    headerName: 'Status',
                    width: 56,
                },
            ],
            rows: [
                {id: 1, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 2, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 3, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 4, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 5, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 6, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 7, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 8, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 9, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 10, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 11, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
                {id: 12, name: 'Test Proeject', numDesigers: 0, hrsScheduled: 0, hrsRequired: 0, hrsAvailable: 0, hrsActual: 0, status: 'Planned'},
            ],
        },
        
    };

    render () {
        return (
            <>
                <div className='dashboardSection'>
                    <h3 className='sectionHeader'>Projects at a Glance:</h3>
                    <DataGrid className='projectsTable' rows={this.state.projectsData.rows} columns={this.state.projectsData.columns} pageSize={10} />
                </div>
                <div className='dashboardSection'>
                    <h3 className='sectionHeader'>Contract Designers this Month:</h3>
                    <DataGrid className='projectsTable' rows={this.state.projectsData.rows} columns={this.state.projectsData.columns} pageSize={10} />
                </div>
                <div className='dashboardSection'>
                    <h3 className='sectionHeader'>My Designers this Month:</h3>
                    <DataGrid className='projectsTable' rows={this.state.projectsData.rows} columns={this.state.projectsData.columns} pageSize={10} />
                </div>
                <div className='dashboardSection'>
                    <h3 className='sectionHeader'>Contract Requests:</h3>
                    <DataGrid className='projectsTable' rows={this.state.projectsData.rows} columns={this.state.projectsData.columns} pageSize={10} />
                </div>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(Dashboard));