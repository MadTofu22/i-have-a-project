

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { theme } from '../../App/Material-UI/MUITheme';
import { ThemeProvider, Typography, Toolbar, AppBar, Container, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import FindDesignerCard from '../../App/Material-UI/findDesignerCard'
import InputLabel from '@material-ui/core/InputLabel';


class FindNewDesigner extends Component {

    state = {
      newSearch: {
        start: '',
        requested_hours: '',
        due_date: '',
        software_id: 0,
        project_id: ``
      }
    };

    handleChange = (event, keyname) => {      
      this.setState({
        newSearch: {
          ...this.state.newSearch,
          [keyname]: event.target.value
        }
      });
    }
    handleHours = (event) => {
      console.log(event.target.value, 'value of change');
      
     if (event.target.value >= 0 && Number(event.target.value) ) {
        this.setState({
          newSearch: {
            ...this.state.newSearch,
            requested_hours: event.target.value
          }
        });
     }
    }
    searchDesigner = () => {
      this.props.dispatch({
        type: "FIND_DESIGNER",
        payload: this.state.newSearch
      })
    }


    render() {
      return (
        <div className="projectDashWrap">
          {/* <ThemeProvider theme={theme}> */}
            {/* <Container maxWidth="md">
              <Box bgcolor="primary.light" height> */}
                <div className="titleWrap">
                 <h1 className="pageTitle">Find New Designer</h1>
                </div>
          <form onSubmit={this.searchDesigner}>
            <div className="findDesignerInputs">
            <div>
 
                <TextField
                  id="start"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  onChange={(event) => this.handleChange(event, 'start')}
                  required
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
                  required
                />
            </div>
            <div>
                <TextField
                    onChange={(event) => this.handleHours(event)}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Hours"
                    type="number"
                    helperText="Hours Designer will need to commit to your project"
                    required
                    value={this.state.newSearch.requested_hours}
                />
            </div>
            <div>
                  {this.props.store.projects.length > 0 &&
                    <>
                      <InputLabel>Choose a Project</InputLabel>
                      <select 
                        type='select'
                        onChange={(event) => this.handleChange(event, 'project_id')}
                        value={this.props.store.projects.length > 0 && this.state.newSearch.project_id }
                      >
                          <option value={``}>Project Name</option>
                          {this.props.store.projects.map( (project) => {                            
                            return <option key={project.id} value={project.id}>{project.project_name}</option>
                          })}
                      </select>
                    </>

                  }
            </div>
            <div>
                  {this.props.store.software.length > 0 ?
                    <Select
                      onChange={(event) =>this.handleChange(event, 'software_id')}
                      value={this.state.newSearch.software_id}
                    > 
                        <MenuItem value={0}>Select a Required Software</MenuItem>
                        {this.props.store.software.map( (softwareObj) => {
                        return <MenuItem key={softwareObj.id} value={softwareObj.id}>{softwareObj.label}</MenuItem>
                      })}
                    </Select>
                  :
                  <></>
                  }
            </div>
              <input type="submit" value="Search" />
              </div>
            </form>
                  <div className="searchResults">
                      {this.props.store.search.length > 0 &&
                  this.props.store.search.map( (desingerObj) => {
                    return <FindDesignerCard 
                              designeInfor={desingerObj}
                              key={desingerObj.designer_id}
                              search={this.state.newSearch}
                            />
                    
                  })
                  }
            </div>
            {/* </Box>
            </Container> */}
            {/* </ThemeProvider> */}
        </div>
      );
    }
  }



export default withRouter(connect(mapStoreToProps)(FindNewDesigner));