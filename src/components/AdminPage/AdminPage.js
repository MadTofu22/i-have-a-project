import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
// import mapStoreToProps from '../../../redux/mapStoreToProps';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import './AdminPage.css'
import { DataGrid } from '@material-ui/data-grid';

class AdminPage extends Component {

    state = {
        rows: [
            {id: 1, username: 'Kris', company: 'manager'},
            {id: 2, username: 'Casie', company: 'manager'},
            {id: 3, username: 'Mary', company: 'manager'},
            {id: 2, username: 'Genia', company: 'manager'},
            {id: 3, username: 'Bethany', company: 'manager'},
        ],
        designerRows: [
            {id: 1, first_name: 'Beau', last_name: 'Wise', manager: 'Casie'},
            {id: 2, first_name: 'Emily', last_name: 'Garber', manager: 'Mary'},
            {id: 3, first_name: 'Stav', last_name: 'Kidron', manager: 'Casie'},
            {id: 4, first_name: 'Sam', last_name: 'Mahler', manager: 'Casie'},
            {id: 5, first_name: 'Leroy', last_name: 'Dahl', manager: 'Kris'},
        ],
    };
    // componentDidMount() {
    //   this.props.dispatch({ type: 'FETCH_MANAGERS' });
    //   this.props.dispatch({ type: 'FETCH_DESIGNERS' });
    // }

    // deleteUser = (event, param) => {
    //     console.log(event, param)
    //     let userData = {
    //       id: param
    //     }
    //     this.props.dispatch({
    //       type: 'DELETE_USER',
    //       payload: userData
    //     })
    //   }  
            render() {
                return (
                    <div style={{ height: 250, width: '100%' }}>
                        {/* <div className='adminDataGrid'> */}
                        <DataGrid
                            columns={[
                                    { field: 'id', headerName: 'Manager ID' },
                                    { field: 'username', headerName: 'Name' },
                                    { field: 'company', headerName: 'Company' },
                                    {
                                        field: 'action',
                                        headerName: 'Action',
                                        renderCell: () => (
                                          <button>
                                            Content
                                          </button>
                                        ),
                                      }
                                ]}
                            rows={this.state.rows}
                        />
                        {/* </div> */}
                        {/* <div className='adminDataGrid'> */}
                        <DataGrid
                            columns={[
                                    { field: 'designer_id', headerName: 'Designer ID' },
                                    { field: 'first_name', headerName: 'First Name' },
                                    { field: 'last_name', headerName: 'Last Name' },
                                    { field: 'manager', headerName: 'Manager' },
                                    {
                                        field: 'action',
                                        headerName: 'Action',
                                        renderCell: () => (
                                            <button>
                                            Content
                                          </button>
                                            // <IconButton aria-label="delete">
                                            //     <DeleteIcon fontSize="large"/>
                                            // </IconButton>
                                        )
                                      }
                                ]}
                            rows={this.state.designerRows}
                        />
                        {/* </div> */}
                       </div>
                       
                );
            }
}


export default withRouter(AdminPage);

// (connect(mapStoreToProps)


// render() {
//     return (
//                 <div> 
//                         <table>
//                             <tr>
//                                 <th>Manager Name</th>
//                                 <th>Company</th>
//                                 <th>Contact</th>
//                                 <th>Modify</th>
//                             </tr>
//                                 {this.props.store.managers.map( manager => {
//                                 return (
//                                             <tr key={manager.id} className='managerList'>
//                                                 <td>{manager.name}</td>
//                                                 <td>{manager.company}</td>
//                                                 <td>{manager.contact}</td>
//                                                 <td>
//                                                 <button className="deleteBtn" onClick={(event) => this.deleteUser(event, manager.id)}>Delete Manager</button>
//                                                 </td>
//                                             </tr>
//                                         )
//                                 }
//                                 )
//                                 }
//                         </table> 
//                 </div>
              
              
//             );    
//         }
