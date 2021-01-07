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
            <ThemeProvider theme={theme}>
            <div style={{width: '100%'}} className="myDesignerInfo">
                <AddTeamMember 
                    managerName='Test Name'
                    managerEmail='Test Email'
                    managerCompany='Test Company'
                    managerId='1'
                />
                <div style={{ height: 250, width: '100%', padding: '20px' }}>
                    <h1>Team Designers</h1>
                    {this.props.store.designer.length > 0 ?
                        <DataGrid
                        autoHeight={true}
                            columns={[
                                    { field: 'id', headerName: 'ID' },
                                    { field: 'first_name', headerName: 'First Name' },
                                    { field: 'last_name', headerName: 'Last Name'}
                                ]}
                            rows={this.props.store.designer}
                        />
                    :
                    <></>}
                </div>
                <br></br>
                <Button variant="contained" color="secondary" style={{ margin: 20 }}
                onClick={() => this.handleNavTo('')}>Find Designer</Button>
                <div style={{ height: 250, width: '100%', padding: '20px' }}>
                            <h1>Contract Designers</h1>
                </div>
            </div>
            </ThemeProvider>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(MyDesigners));