import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { theme } from '../../App/Material-UI/MUITheme';
import { ThemeProvider, Typography, Toolbar, AppBar } from '@material-ui/core';
import Button from '@material-ui/core/Button';



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
        <div style={{
          position: 'absolute', 
          left: '50%', 
          top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
          <ThemeProvider theme={theme}>
          <AppBar 
          position="static" 
          color="primary" 
          className="app-header" 
          style={{ margin: 20 }}  
          alignItems="center"
          justify="center">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Find A Designer
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
          <form onSubmit={this.searchDesigner}>


            
            <ThemeProvider theme={theme}>
            
            <div>
            
                <TextField
                  id="start"
                  label="Start Date"
                  type="date"
                  style={{ margin: 20 }}
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
                  style={{ margin: 20 }}
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
                    style={{ margin: 20 }}
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
            <Button variant="contained" color="secondary" style={{ margin: 20 }}>
            {/* <input type="submit" value="Search" /> */}Submit
            </Button>
            </ThemeProvider>
            
            </form>
            </div>
      );
    }
  }
  


export default withRouter(connect(mapStoreToProps)(FindNewDesigner));