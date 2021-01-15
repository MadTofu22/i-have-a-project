import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddTeamMember from '../../Modals/AddTeamMember'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import ChangeRate from '../../Modals/ChangeRate';
import SearchIcon from '@material-ui/icons/Search';


class MyDesigners extends Component {

    
    handleNavTo = () => {
        this.props.history.push('/ManagerHomeView/Search');
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_DESIGNERS"
        })
        this.props.dispatch({
            type: "FETCH_CONTRACT_DESIGNERS"
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

	render() {
		return (
           
            <div className="componentViewWrap">
                    <br/>
                    <br/>
                <div  className="myDesignerInfo">
                    <div>
                       
                        <div  className="teamDesignersWrap" >
                        <h3>My Team Designers</h3>
                            {this.props.store.user && 

                            <div className="myDesignerButton">
                                <AddTeamMember 
                                    managerName={this.props.store.user.first_name + ' ' + this.props.store.user.last_name}
                                    managerEmail={this.props.store.user.email}
                                    managerCompany={this.props.store.user.company}
                                    managerId={this.props.store.user.id}
                                />
                    </div>
                    }
                   
                    {this.props.store.designer.length > 0 ?
                    <div className="myDesignersTableWrap">
                        <DataGrid
                        // autoHeight={true}
                            
                            columns={[
                                    { field: 'id', headerName: 'ID', width: 100},
                                    { field: 'first_name', headerName: 'First Name',  width: 200},
                                    { field: 'last_name', headerName: 'Last Name',  width: 300},
                                    { field: 'rate',
                                        width: 150, 
                                        headerName: 'Rate',
                                        renderCell: (params) => (
                                            <>
                                            <AttachMoneyIcon /> {params.row.rate}
                                            <ChangeRate
                                                    fontSize="small"
                                                    designer={{id: params.row.id}}
                                                    rate={params.row.rate}
                                            />
                                            </>
                                    )},
                                    {
                                        field: 'delete',
                                        headerName: 'Delete',
                                        width: 150, 
                                        renderCell: (params) => (
                                            <IconButton aria-label="delete" onClick={() => this.deleteUser(params.row.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )
                                    }
                                ]}
                            rows={this.props.store.designer}
                        />
                     </div>
                    :
                    <div>You don't have any designers yet</div>
                    }
                    </div>                   
                </div>
               
                <div className='contractDesignerSectionWrap'>
                    <h3>Contract Designers</h3>
                        
                        <Button 
                            style={{
                                marginBottom: '10px'
                            }}
                            variant="contained" 
                            onClick={() => this.handleNavTo()}
                            ><SearchIcon/> Find Designer
                        </Button>
                        <div className="contractDesignerWrap">
                        {this.props.store.contractDesigners.length > 0 ?
                        <div className="myDesignersTableWrap">
                        <DataGrid
                            autoHeight={true}
                            columns={[
                                    { field: 'id', headerName: 'ID', width: 100},
                                    { field: 'company', headerName: 'Company',  width: 200},
                                    { field: 'first_name', headerName: 'First Name',  width: 200},
                                    { field: 'last_name', headerName: 'Last Name',  width: 200},
                                    { field: 'rate', headerName: 'Rate',  width: 200},
                                    { field: 'requested_hours', headerName: 'Est. Hours',  width: 200}
                                ]}
                            rows={this.props.store.contractDesigners}
                        />
                        </div>
                    :
                    <h4>You don't have any designers yet</h4>}
                    </div>
                </div>
                
                </div>
            </div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyDesigners));