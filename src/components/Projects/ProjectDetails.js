import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddDesigner from '../Modals/AddDesigner'

import { DataGrid } from '@material-ui/data-grid';

import ProjectActionMenu from './ProjectActionMenu'
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home';
import TextField from '@material-ui/core/TextField';



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
        if (usertype === 'manager') {
            this.props.history.push(`/ManagerHomeView/Dashboard`)
        } else if (usertype === 'Designer') {
            this.props.history.push(`/DesignerHomeView/Projects`)
        }
    }
    formatTableColumns = () => {
        let columnFormat = []
        if (this.props.store.user.user_type === 'manager') {
            columnFormat = [
                { field: 'id', headerName: 'ID' },
                { field: 'first_name', headerName: 'First Name' },
                { field: 'last_name', headerName: 'Last Name' },
                { field: 'hours_est', headerName: 'Est. Time' },
                {field: 'action',
                    headerName: 'Action',
                    renderCell: (params) => {
                       return(<ProjectActionMenu rowProps={params} project_id={this.props.match.params.project_id}/>)
                    },
                }
            ]
        } else if (this.props.store.user.user_type === 'Designer') {
            columnFormat = [
                { field: 'id', headerName: 'ID' },
                { field: 'first_name', headerName: 'First Name' },
                { field: 'last_name', headerName: 'Last Name' },
                { field: 'hours_est', headerName: 'Est. Time' }
            ]
        }
        return columnFormat
    }
    

    render () {
        return (
            <div >

                <h1>Projects</h1>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<HomeIcon/>}
                    onClick={this.goBackHome}
                >Home</Button>
                {this.props.store.projectDetails.projectDetails ? 
                    <>
                        <h2><div>{this.props.store.projectDetails.projectDetails.project_name}</div></h2>
                        <p>Project Description: <Paper  style={{width: '300px', height: '20px', padding: '30px'}}>{this.props.store.projectDetails.projectDetails.notes}</Paper></p>


                                <TextField
                                    id="date"
                                    label="Start Date"
                                    type="date"
                                    value={this.props.store.projectDetails.projectDetails.start.slice(0,10)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <TextField
                                    id="date"
                                    label="Due Date"
                                    type="date"
                                    value={this.props.store.projectDetails.projectDetails.due_date.slice(0,10)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                    </>
                    :
                    <></>
                }
                {this.props.store.user.user_type === 'manager' ?
                    <>
                    <button onClick={this.goToEditPage}>Edit Project</button>
                    <AddDesigner project_id={this.props.match.params.project_id} />
                    </>
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
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ProjectDetails));