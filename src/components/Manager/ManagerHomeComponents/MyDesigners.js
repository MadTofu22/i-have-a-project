import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { DataGrid } from '@material-ui/data-grid';

import AddTeamMember from '../../Modals/AddTeamMember'

class MyDesigners extends Component {
   
    state = {
		team: [
			{id: 1, name: 'Simon', projects: 3, scheduledHours: 40, AvailbleHours: 50},
			{id: 2, name: 'Elliot', projects: 3, scheduledHours: 40, AvailbleHours: 50},
			{id: 3, name: 'Rachel', projects: 3, scheduledHours: 40, AvailbleHours: 50},
			{id: 4, name: 'Peter', projects: 3, scheduledHours: 40, AvailbleHours: 50},
			{id: 5, name: 'Tom', projects: 3, scheduledHours: 40, availbleHours: 50},
        ],
        contracted: [
			{id: 1, name: 'Simon', contractedFor: 'projectname', scheduledHours: 40, manager: 'Prime'},
			{id: 2, name: 'Elliot', contractedFor: 'projectname', scheduledHours: 40, manager: 'Prime'},
			{id: 3, name: 'Rachel', contractedFor: 'projectname', scheduledHours: 40, manager: 'Prime'},
			{id: 4, name: 'Peter', contractedFor: 'projectname', scheduledHours: 40, manager: 'Prime'},
			{id: 5, name: 'Tom', contractedFor: 'projectname', scheduledHours: 40, manager: 'Prime'},
		]
    };
    
    handleNavTo = () => {
        this.props.history.push('/ManagerHomeView/Search');
    }
	render() {
		return (
            
            <div style={{width: '100%'}}>
                <AddTeamMember 
                    managerName='Test Name'
                    managerEmail='Test Email'
                />
                <div style={{ height: 250, width: '100%', padding: '20px' }}>
                    <DataGrid
                        columns={[
                                { field: 'id', headerName: 'ID' },
                                { field: 'name', headerName: 'Designer' },
                                { field: 'projects', headerName: '# of Projects' },
                                { field: 'scheduledHours', headerName: 'Scheduled Hours'},
                                { field: 'availableHours' , headerName: 'Available Hours' }
                            ]}
                        rows={this.state.team}
                    />
                </div>
                <div style={{ height: 250, width: '100%' }}>
                <button onClick={() => this.handleNavTo('')}>Find Designer</button>
                <DataGrid
                    columns={[
                            { field: 'id', headerName: 'ID' },
                            { field: 'name', headerName: 'Designer' },
                            { field: 'contractedFor', headerName: 'Project Name' },
                            { field: 'scheduledHours', headerName: 'Scheduled Hours'},
                            { field: 'manager' , headerName: 'Manager' }
                        ]}
                    rows={this.state.contracted}
                />
                </div>
            </div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyDesigners));