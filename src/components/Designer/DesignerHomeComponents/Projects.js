import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import { DataGrid } from '@material-ui/data-grid';

class Projects extends Component {
	state = {
		rows: [{
			id: 1, name: 'projectTable', status: 'In Progress', owner: 'Simon', Scheduled: 20
		}]
	};

	render() {
		return (
			<div style={{ height: 250, width: '100%' }}>
				<DataGrid
					columns={[{ field: 'ID' }, { field: 'name' }, { field: 'status' }, { field: 'owner' }, { field: 'Scheduled Hours' }]}
					rows={[
					{ id: 1, name: 'React' },
					{ id: 2, name: 'Material-UI' },
					]}
				/>
   			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(Projects));
