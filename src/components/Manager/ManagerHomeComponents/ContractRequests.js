import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class ContractRequests extends Component {
    
    state = {
        requestingManager: '',
        contractedManager: '',
        contractedDesigner: '',
        project: '',
        software: '',
        requestedHours: 0,
        dateSent:0,
        requestedStatus: ''
    };

    render () {
        let inboxTable = Object.keys(this.state.inboxItems[0])
    
        return (
            <>
            <div>Inbox:</div>
                <table> 
                    <thead>
                        <tr>
                            <th>Inquiring Manager</th>
                            <th>Requested Designer</th>
                            <th>Project Timeline</th>
                            <th>Date Received</th>
                        </tr>
                    </thead> 
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>       
                        </tbody>
                </table>
            <button>accept</button>
            <button>deny</button>
            <div>Outbox:</div>
            <table>
                <thead>
                    <tr>
                        <th>Requested Designer Name</th>
                        <th>Team Manager</th>
                        <th>Project Name</th>
                        <th>Hourly Rate</th>
                        <th>Date Submitted</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                            <tr>
                                <td></td>
                            </tr>       
                </tbody>
            </table>
            <button>accept</button>
            <button>deny</button>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ContractRequests));