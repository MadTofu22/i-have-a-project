import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddDesigner from '../Modals/AddDesigner'

import { DataGrid } from '@material-ui/data-grid';

import ProjectActionMenu from './ProjectActionMenu'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit';


class ProjectDetails extends Component {
    
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
        this.props.history.push(`/ManagerHomeView/EditProject/${this.props.match.params.project_id}`)
    }
    goBackHome = () =>{
        let usertype = this.props.store.user.user_type
        if (usertype === 'Designer') {
            this.props.history.push(`/DesignerHomeView/Projects`)
        }
    }
    formatTableColumns = () => {
        let columnFormat = []
        if (this.props.store.user.user_type === 'manager') {
            columnFormat = [
                { field: 'id', headerName: 'ID'},
                { field: 'first_name', headerName: 'First Name', width: 200},
                { field: 'last_name', headerName: 'Last Name', width: 200},
                { field: 'hours_est', headerName: 'Est. Time', width: 200},
                {field: 'action',
                    width: 200, 
                    headerName: 'Action',
                    renderCell: (params) => {
                       return(<ProjectActionMenu rowProps={params} project_id={this.props.match.params.project_id}/>)
                    },
                }
            ]
        } else if (this.props.store.user.user_type === 'Designer') {
            columnFormat = [
                { field: 'id', headerName: 'ID' },
                { field: 'first_name', headerName: 'First Name', width: 200 },
                { field: 'last_name', headerName: 'Last Name', width: 200 },
                { field: 'hours_est', headerName: 'Est. Time', width: 200 }
            ]
        }
        return columnFormat
    }
    

    render () {
        return (
            <div className="componentViewWrap">
                <h3 className="pageTitle">Project Details</h3>
            <div className="projectDetailsWrap">
                {this.props.store.projectDetails.projectDetails ? 
                <div className="projectInfoWrap">
                    <div className="projectActionMenu">
                        <h2><div>{this.props.store.projectDetails.projectDetails.project_name}</div></h2>

                        {this.props.store.user.user_type === 'manager' ?
                        <div>
                                    
                                    <Button onClick={this.goToEditPage}> <EditIcon/> Edit Project</Button>
                                    <AddDesigner project_id={this.props.match.params.project_id} />
                                </div>
                            :
                                <></>
                        }
                        
                        <div className="projectTimeLineWrap">
                            <h4>Timeline:</h4>
                            <div   className="dateInput">
                                    <TextField
                                            id="date"
                                            label="Start Date"
                                            type="date"
                                            value={this.props.store.projectDetails.projectDetails.start.slice(0,10)}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                            </div>
                            <div   className="dateInput">
                                    <TextField
                                        id="date"
                                        label="Due Date"
                                        type="date"
                                        value={this.props.store.projectDetails.projectDetails.due_date.slice(0,10)}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                            </div>
                        </div>
                        </div>
                        <div className="descriptionWrap">
                            Project Description: 
                            <Paper  
                                style={{
                                    width: '250px', 
                                    height: '150px', 
                                    padding: '30px',
                                    overflow: 'scroll'
                                }}
                            >{this.props.store.projectDetails.projectDetails.notes}
                            </Paper>
                        </div>
                            
                    </div>
                    :
                    <></>
                }
               
                {this.props.store.projectDetails.projectDesigners ?
                    <div style={{ height: 300, width: '100%' }}>
                        <h2>Project Designers</h2>
                            <DataGrid
                                columns={this.formatTableColumns()}         
                                rows={this.props.store.projectDetails.projectDesigners}          
                            />
                    </div>
                    :
                    <></>
                }
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ProjectDetails));