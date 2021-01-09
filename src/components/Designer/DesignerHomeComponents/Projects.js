import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import { DataGrid } from '@material-ui/data-grid';

class Projects extends Component {

	handleClickProjects = (row) => {
		console.log(row.row.project_id);
		this.props.history.push(`/DesignerHomeView/ProjectDetails/${row.row.project_id}`)
	}

	render() {
		return (
			<div className="componentViewWrap" >
				 <h3 className='pageTitle'>My Projects:</h3>
				{this.props.store.projects.length > 1 ?
					<div className="projectsTableWrap">
					<DataGrid
						columns={[
								{ field: 'id', headerName: 'Project ID', width: 200, },
								{ field: 'project_name', headerName: 'Name', width: 250,},
								{ field: 'status', headerName: 'Status', width: 250, },
								{ field: 'due_date', headerName: 'Due Date', width: 250,}
							]}
						rows={this.props.store.projects}
						onRowClick={(rowParams) => this.handleClickProjects(rowParams)}
					/>
					</div>
				:
						<div>You don't have any projects assigned yet!</div>
				}
				
   			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(Projects));
