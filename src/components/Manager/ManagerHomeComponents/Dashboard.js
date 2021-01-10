import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import {DataGrid} from '@material-ui/data-grid';

import { theme } from '../../App/Material-UI/MUITheme';
import { ThemeProvider, Button } from '@material-ui/core';

class Dashboard extends Component {
    
    state = {
        projectsData: { // Table data for the projects at a glance table. This will be replaced with redux later
            columns: [
                {
                    field: 'id',
                    headerName: '#',
                    width: 100,
                },
                {
                    field: 'project_name', // Name of the project
                    headerName: 'Project Name',
                    width: 340,
                },
                {
                    field: 'start', // Total number of hours scheduled for this project across all designers
                    headerName: 'Start Date',
                    width: 230,
                },
                {
                    field: 'due_date', // Total number of required hours estimated to be completed for this project
                    headerName: 'Due',
                    width: 230,
                },
                {
                    field: 'status',
                    headerName: 'Status',
                    width: 150,
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
		this.props.history.push(`/ManagerHomeView/ProjectDetails/${row.row.id}`)
	}

    render () {
        return (
            <ThemeProvider class={theme}>
            <div className='componentViewWrap'>
                <h3 className='pageTitle'>My Projects:</h3>
                <div className='projectsTableWrap'>
                    
                    {this.props.store.projects.length > 0 ?
                         
                        <DataGrid className='projectsTable' 
                            rows={this.props.store.projects} 
                            columns={this.state.projectsData.columns} 
                            pageSize={10}
                            onRowClick={(rowParams) => this.handleClickProjects(rowParams)}
                         />
                        :
                        <div>No Projects found.</div>
                    }
                </div>
            </div>
            </ThemeProvider>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(Dashboard));