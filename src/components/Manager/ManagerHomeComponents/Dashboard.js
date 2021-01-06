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
                    field: 'manager_id', // Total number of designers assigned to the project
                    headerName: 'Manger ID',
                    // width: 56,
                },
                {
                    field: 'project_name', // Name of the project
                    headerName: 'Project Name',
                    width: 124,
                },
                {
                    field: 'start', // Total number of hours scheduled for this project across all designers
                    headerName: 'Start Date',
                    // width: 56,
                },
                {
                    field: 'due_date', // Total number of required hours estimated to be completed for this project
                    headerName: 'Due',
                    // width: 56,
                },
                {
                    field: 'notes', // Total number of hours all assigned developers have available
                    headerName: 'Notes',
                    // width: 56,
                },
                {
                    field: 'status',
                    headerName: 'Status',
                    width: 56,
                },
            ],
            rows: [],
        },
        
    };

    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_MANAGER_PROJECTS"
        });
    }

    handleClickProjects = (row) => {
		console.log(row.row.id);
		this.props.history.push(`/projectDetails/${row.row.id}`)
	}

    render () {
        return (
            <>
                <div className='dashboardSection'>
                    <h3 className='sectionHeader'>Projects at a Glance:</h3>
                    {this.props.store.projects.length > 0 ?
                        <DataGrid className='projectsTable' 
                            rows={this.props.store.projects} 
                            columns={this.state.projectsData.columns} 
                            pageSize={10}
                            onRowClick={(rowParams) => this.handleClickProjects(rowParams)}
                         />
                        :
                        ''
                    }
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