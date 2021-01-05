import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';



class FindNewDesigner extends Component {

    state = {
      newSearch: {
        start: '',
        requested_hours: '',
        due_date: '',
        software_id: 0
      },
      softwareInit: 0
    };

    handleChange = (event, keyname) => {
      console.log(event.target.value, 'value of change');
      
      this.setState({
        newSearch: {
          ...this.state.newSearch,
          [keyname]: event.target.value
        }
      });
    }
    searchDesigner = () => {
      this.props.dispatch({
        type: "FIND_DESIGNER",
        payload: this.state.newSearch
      })
    }

    render() {
      return (
        <div>
          <form onSubmit={this.searchDesigner}>
            <h1>Find New Designer</h1>
            <div>
                <TextField
                  id="start"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  onChange={(event) => this.handleChange(event, 'start')}
                />
            </div>
            <div>

                <TextField
                  id="date"
                  label="Due Date"
                  type="date"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  onChange={(event) => this.handleChange(event, 'due_date')}
                />
            </div>
            <div>
                <TextField
                    onChange={(event) => this.handleChange(event, 'hoursCommitted')}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Hours"
                    type="number"
                    helperText="Hours Designer will need to be available for"
                />
            </div>
            <div>
                  {this.props.store.software.length > 0 ?
                    <TextField
                      select 
                      onChange={(event) =>this.handleChange(event, 'software')}
                      defaultValue={this.state.newSearch.software_id}
                      helperText="Select a Primary Software"
                    > 
                               <MenuItem value={0}>Select a Software</MenuItem>
                        {this.props.store.software.map( (softwareObj) => {
                        return <MenuItem key={softwareObj.id} value={softwareObj.id}>{softwareObj.label}</MenuItem>
                      })}
                    </TextField>
                  :
                  <></>
                  }
            </div>


            <input type="submit" value="Search" />
            </form>
        </div>
      );
    }
  }
  


export default withRouter(connect(mapStoreToProps)(FindNewDesigner));