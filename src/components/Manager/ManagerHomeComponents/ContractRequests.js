import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class ContractRequests extends Component {   

    state = {
        inquiringManager: [],
        requestedDesigner: '',
        projectTimeline: '',
        dateReceived: 0,
        TeamManager: '',
        ProjectName: '',
        dateSubmitted: 0,
        status: ''
    };

    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_INBOX",
            payload: {id: this.props.store.user.id}
        })
        console.log("in component did mount", this.props.store.user.id)

        this.props.dispatch({
            type: "FETCH_OUTBOX",
            payload: {id: this.props.store.user.id}
        })
    }

    dateFunction = (date) => {
        console.log("date", date)
        let day = date.slice(8,10)
        console.log("date", day)
        let month = date.slice(5,7)
        console.log("date", month)
        let year = date.slice(0,4)
        console.log("date", year)
        let americanDateFormat = month + "/" + day + "/" + year
        return americanDateFormat
    }

    handleOutboxDelete = (id, managerId) => {
        console.log(id)
        this.props.dispatch({
            type: 'DELETE_PROJECT',
            payload: {id, managerId}
        })
    }    

    handleInboxAccept = (id, managerId) => {
        console.log(id, 'in handleInboxAccept')
        this.props.dispatch({
            type: 'UPDATE_REQUEST',
            payload: {id, managerId}
        })
    }  

    handelInboxDeny = (id, managerId) => {
        console.log(id, 'in handleInboxDeny')
        this.props.dispatch({
            type: 'UPDATE_REQUEST',
            payload: {id, managerId}
        })
    } 

    render () {
        return (
        
            <>
            {/* {JSON.stringify(this.props.store.outbox)} */}
            {/* {JSON.stringify(this.props.store.inbox)} */}
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
                        {this.props.store.inbox.length > 0 ?
                                this.props.store.inbox.map((inbox) => {
                                    if (inbox.contractData.request_status !== 'completed'){
                                    return(
                                        <tr>                                        
                                        <td>{inbox.managerData.first_name + " " + inbox.managerData.last_name}</td>
                                        <td>{inbox.designerData.first_name + " " + inbox.designerData.last_name}</td>
                                        <td>{this.dateFunction(inbox.contractData.start.slice(0,10)) + " - " + this.dateFunction(inbox.contractData.due_date.slice(0,10))}</td>
                                        <td>{this.dateFunction(inbox.contractData.date_sent.slice(0,10))}</td>
                                        <td><button onClick={() => this.handleInboxAccept(inbox.contractData.contract_id, this.props.store.user.id)}>accept</button></td>
                                        <td><button onClick={() => this.handelInboxDeny(inbox.contractData.contract_id, this.props.store.user.id)}>deny</button></td>
                                        </tr>
                                    )
                                    }
                                })
                                :
                                <>
                                </>
                                }
                                 
                        </tbody>
                </table>
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
                    
                    {this.props.store.outbox.length > 0 ?
                                this.props.store.outbox.map((outbox) => {
                                    return(
                                        <tr>                                        
                                        <td>{outbox.designerData.first_name + " " + outbox.designerData.last_name}</td>
                                        <td>{outbox.managerData.first_name + " " + outbox.managerData.last_name}</td>
                                        <td>{outbox.contractData.project_name}</td>
                                        <td>{outbox.designerData.rate}</td>
                                        <td>{this.dateFunction(outbox.contractData.date_sent.slice(0,10))}</td>
                                        <td>{outbox.contractData.status}</td>
                                        <td><button onClick={() => this.handleOutboxDelete(outbox.contractData.contract_id, this.props.store.user.id)}>delete</button></td>
                                        </tr>
                                    )
                                })
                                :
                                <>
                                </>
                                }
                          
                </tbody>
            </table>
    
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ContractRequests));
