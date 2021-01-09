import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { DataGrid } from '@material-ui/data-grid';
import { theme } from '../../App/Material-UI/MUITheme';
import { ThemeProvider, Button } from '@material-ui/core';

import AddTeamMember from '../../Modals/AddTeamMember'

class MyDesigners extends Component {
   
    
    handleNavTo = () => {
        this.props.history.push('/ManagerHomeView/Search');
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_DESIGNERS"
        })
    }
	render() {
		return (
           
                <div className="projectDashWrap">
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
                                    { field: 'first_name', headerName: 'First Name', width: '25%'},
                                    { field: 'last_name', headerName: 'Last Name', width: '25%'}
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