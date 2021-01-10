import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { DataGrid } from '@material-ui/data-grid';
import { theme } from '../../App/Material-UI/MUITheme';
import { ThemeProvider, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddTeamMember from '../../Modals/AddTeamMember'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


class MyDesigners extends Component {
   
    
    handleNavTo = () => {
        this.props.history.push('/ManagerHomeView/Search');
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_DESIGNERS"
        })
    }

    deleteUser = (userId, type) => {
        console.log("hello from delete MyDesigners", userId)
        let userData = {
          designer_id: userId
        }
        this.props.dispatch({
          type: 'DELETE_TEAM_MEMEBER',
          payload: userData
        })
    } 
    // Formulas for the rate change modal that are within component

    

	render() {
		return (
           
                <div className="componentViewWrap">
                 <h3 className=''>My Designers:</h3>

            <div style={{width: '100%'}} className="myDesignerInfo">
                {this.props.store.user && 
                    <AddTeamMember 
                        managerName={this.props.store.user.first_name + ' ' + this.props.store.user.last_name}
                        managerEmail={this.props.store.user.email}
                        managerCompany={this.props.store.user.company}
                        managerId={this.props.store.user.id}
                    />
                }
                <div style={{ height: 250, width: '100%', padding: '20px' }}>
                    <h1>Team Designers</h1>
                    {this.props.store.designer.length > 0 ?
                        <DataGrid
                        style={{height: 250, width: '100%', padding: '20px'}}
                        autoHeight={true}
                            columns={[
                                    { field: 'id', headerName: 'ID'},
                                    { field: 'first_name', headerName: 'First Name'},
                                    { field: 'last_name', headerName: 'Last Name'},
                                    {field: 'rate',
                                    headerName: 'Rate',
                                    renderCell: (params) => (
                                        <form>
                                            <Button aria-label="delete" onClick={() => this.deleteUser(params.row.id)}>
                                                <ChangeRate
                                                    fontSize="small"
                                                    closeClickEvent={this.closeClickEvent}
                                                    clickEvent={this.state.clickEvent}
                                                    designer={{id: element.designerInfo.designer_id}}
                                                />
                                            </Button>
                                        </form>
                                    )},
                                    {
                                        field: 'delete',
                                        headerName: 'Delete',
                                        renderCell: (params) => (
                                            <IconButton aria-label="delete" onClick={() => this.deleteUser(params.row.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )
                                    }
                                ]}
                            rows={this.props.store.designer}
                        />
                    :
                    <div>You don't have any designers yet</div>}
                </div>
                <br></br>
                <Button variant="contained" color="secondary" style={{ margin: 20 }}
                onClick={() => this.handleNavTo('')}>Find Designer</Button>
                <div style={{ height: 250, width: '100%', padding: '20px' }}>
                            <h1>Contract Designers</h1>
                </div>
            </div>
            </div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyDesigners));