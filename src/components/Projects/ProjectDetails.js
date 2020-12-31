import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddDesigner from '../Modals/AddDesigner'

import { DataGrid } from '@material-ui/data-grid';

class ProjectDetails extends Component {
    
    state = {

    };
    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_PROJECT_DETAILS",
            payload: this.props.match.params.project_id
        })
        this.props.dispatch({
			type: "FETCH_DESIGNERS"
		})
    }
    goToEditPage = () =>{
        this.props.history.push(`/projectEdit/${this.props.match.params.project_id}`)
    }
    goBackHome = () =>{
        let usertype = this.props.store.user.user_type
        if (usertype === 'Manager') {
            this.props.history.push(`/ManagerHomeView`)
        } else if (usertype === 'Designer') {
            this.props.history.push(`/DesignerHomeView/Projects`)
        }
    }
    

    render () {
        return (
            <div >
                {this.props.store.projectDetails.projectDetails ? 
                    <>
                        <div>{this.props.store.projectDetails.projectDetails.project_name}</div>
                        <div>{this.props.store.projectDetails.projectDetails.notes}</div>
                        <div>{this.props.store.projectDetails.projectDetails.start + '--' + this.props.store.projectDetails.projectDetails.due_date}</div>
                    </>
                    :
                    <></>
                }
                {this.props.store.user.user_type === 'Manager' ?
                    <button onClick={this.goToEditPage}>Edit Project</button>
                    :
                    <></>
                }
                <button onClick={this.goBackHome}>Back</button>
                {this.props.store.projectDetails.projectDesigners ?
                    <div style={{ height: 300, width: '100%' }}>
                        <h2>Project Designers</h2>
                        <AddDesigner />
                        <DataGrid
                            columns={[
                                { field: 'id', headerName: 'ID' },
                                { field: 'first_name', headerName: 'First Name' },
                                { field: 'last_name', headerName: 'Last Name' },
                                { field: 'hours_est', headerName: 'Est. Time' },
                                {field: 'action',
                                    headerName: 'Action',
                                    renderCell: () => {
                                        return(
                                            <button>
                                                Delete
                                            </button>
                                            )
                                    }     
                                }
                            ]}         
                            rows={this.props.store.projectDetails.projectDesigners}          
                        />
                    </div>
                    :
                    <></>
                }
                
            </div>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ProjectDetails));