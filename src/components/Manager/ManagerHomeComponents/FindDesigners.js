

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { theme } from '../../App/Material-UI/MUITheme';
import { ThemeProvider } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import FindDesignerCard from '../../App/Material-UI/findDesignerCard'
import InputLabel from '@material-ui/core/InputLabel';
import { TrainRounded } from '@material-ui/icons';


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

      if (keyname === 'project_id') {
        this.props.dispatch({
          type: 'FETCH_PROJECT_DETAILS',
          payload: event.target.value,
        })
      }
    }

    handleHours = (event) => {
      let characters = ['1','2','3','4','5','6','7','8','9','0']
      let result = false
       for (const number of characters) {
         if (event.target.value[event.target.value.length - 1] == number) {
           console.log(event.target.value[event.target.value.length - 1]);
           
           result = true
         }
       }
      if (result === true) {
        this.setState({
          newSearch: {
            ...this.state.newSearch,
            requested_hours: Number(event.target.value)
          }
        });
      }
    }
    searchDesigner = (event) => {
      event.preventDefault()
      this.props.dispatch({
        type: "FIND_DESIGNER",
        payload: this.state.newSearch
      })
    }


    render() {
      return (
        <div className="componentViewWrap">
          <br/>
          <br/>
          <ThemeProvider theme={theme}>
          <div className="findDesignerPageWrap">
          <form onSubmit={(event) => this.searchDesigner(event)}>
            <div className="findDesignerWrap">
             <div className="searchColumn-left">
                <label className="searchOptionLabel">
                    Timeline:
                  </label>
                    <div className="dateInput">
                      <TextField
                        id="start"
                        label="Start Date"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(event) => this.handleChange(event, 'start')}
                        required
                      />
                    </div>
                    <div className="dateInput">
                        <TextField
                          id="date"
                          label="Due Date"
                          type="date"
                          variant="outlined"
                          InputLabelProps={{
                          shrink: true,
                          }}
                          onChange={(event) => this.handleChange(event, 'due_date')}
                          required
                        />
                    </div>
                    <div className="hoursSearchInput">
                        <TextField
                            onChange={(event) => this.handleHours(event)}
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            id="name"

                            helperText="Hours Designer will need to be available for"
                            required
                            value={this.state.newSearch.requested_hours}
                        />
                    </div>
                </div>
                
                <div>

                <div>
                    
                  <label className="searchOptionLabel"> Details: </label>
                  {this.props.store.projects.length > 0 &&
                    <div className="projectSearchInput">
                      <InputLabel>Choose a Project</InputLabel>
                      <Select 
                        type='select'
                        variant="outlined"
                        onChange={(event) => this.handleChange(event, 'project_id')}
                        value={this.props.store.projects.length > 0 && this.state.newSearch.project_id }
                      >
                          {this.props.store.projects.map( (project) => {                            
                            return <MenuItem key={project.id} value={project.id}>{project.project_name}</MenuItem>
                          })}
                      </Select>
                    </div>

                  }
            </div>
              <div className="softwareSearchInput">
                  {this.props.store.software.length > 0 ?
                    <Select
                      onChange={(event) =>this.handleChange(event, 'software_id')}
                      value={this.state.newSearch.software_id}
                      variant="outlined"
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
                    <div  className="searchBtn">
                    <Button type="submit" value="Search" variant="contained">Search</Button>
                    </div>
                   </div>
                </div>
                <Divider  variant="middle"/>

             </form>
                <div className="searchResults">
                {this.props.store.search.length > 0 &&
                  this.props.store.search.map( (designerObj) => {

                    const projectInfo = {
                      id: this.state.newSearch.project_id, 
                      software_label: this.props.store.software[designerObj.designerInfo.software_id].label, 
                      start: this.state.newSearch.start, 
                      end: this.state.newSearch.due_date,
                      hours: this.state.newSearch.requested_hours,
                      desc: this.props.store.projectDetails.projectDetails.notes,
                    }
                    console.log('in find designers, designerObj =', designerObj, 'projectInfo=', projectInfo, 'this.props.store.user', this.props.store.user);

                    return <FindDesignerCard 
                              designerInfo={designerObj}
                              projectInfo={projectInfo}
                              requestingManagerInfo={this.props.store.user}
                              key={designerObj.designer_id}
                              search={this.state.newSearch}
                            />
                    
                  })
                }
              </div>
            </div>
            </ThemeProvider>
        </div>
      );
    }
  }



export default withRouter(connect(mapStoreToProps)(FindNewDesigner));