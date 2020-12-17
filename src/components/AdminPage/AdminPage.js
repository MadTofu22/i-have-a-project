import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../../redux/mapStoreToProps';

import { DataGrid } from '@material-ui/data-grid';

class AdminPage extends Component {

    state = {
        rows: [
            {id: 1, username: 'Kris', company: 'manager'},
            {id: 2, username: 'Casie', company: 'manager'},
            {id: 3, username: 'Mary', company: 'manager'},
            {id: 2, username: 'Genia', company: 'manager'},
            {id: 3, username: 'Bethany', company: 'manager'},
        ]
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
                        <DataGrid
                            columns={[
                                    { field: 'id', headerName: 'Manager ID' },
                                    { field: 'username', headerName: 'Name' },
                                    { field: 'company', headerName: 'Company' },
                                ]}
                            rows={this.state.rows}
                        />
                       </div>
                );
            }
}


export default withRouter(connect(mapStoreToProps)(AdminPage));


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
