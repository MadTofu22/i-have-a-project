import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import { DataGrid } from '@material-ui/data-grid';

class Projects extends Component {
	state = {
		rows: [
			{id: 1, name: 'projectTable', status: 'In Progress', owner: 'Simon', hours: 20},
			{id: 2, name: 'CalendarView', status: 'completed', owner: 'Peter', hours: 4},
			{id: 3, name: 'My Profile', status: 'Scheduled', owner: 'Tom', hours: 8},
			{id: 2, name: 'Dashboard', status: 'completed', owner: 'Rachel', hours: 10},
			{id: 3, name: 'DB', status: 'In Progress', owner: 'Elliot', hours: 8},
		]
	};
	render() {
		return (
			<div style={{ height: 250, width: '100%' }}>
				<DataGrid
					columns={[
							{ field: 'id', headerName: 'Project ID' },
							{ field: 'name', headerName: 'Name' },
							{ field: 'status', headerName: 'Status' },
							{ field: 'owner', headerName: 'Project MAnager'},
							{ field: 'hours', headerName: 'Scheduled Hours' }
						]}
					rows={this.state.rows}
				/>
   			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(Projects));
