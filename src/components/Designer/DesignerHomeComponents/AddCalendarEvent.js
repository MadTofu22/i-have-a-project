import React, {Component} from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';

import mapStoreToProps from '../../../redux/mapStoreToProps';

class AddCalendarEvent extends Component{

  state = {
    open: false,
    allocatedToProject: false,
    clickEvent: {
        dialog: 'Add New Event',
				id: 0,
				title: '',
				start: '',
				hoursCommitted: 0,
        renderModal: false,
        project_id: null
  	}
  }
  componentDidUpdate = () => {
    console.log('propsinfo', this.props.clickEvent);
    let isProject = false;

    if (this.props.clickEvent.id !== this.state.clickEvent.id) {
      if (this.props.clickEvent.project_id != null) {
        isProject = true
        console.log('is project', isProject);
      }
      this.setState({
        clickEvent: this.props.clickEvent,
        allocatedToProject: isProject
      })
      if (this.props.clickEvent.id !== 0 ) {
        this.setState({
          open: true
        })
      }    
    }
  }

  // potential to pass probs and trigger modal this way

   handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

   handleClose = () => {
    this.setState({
      open: false
    })
    this.props.closeClickEvent()
  };

   handleAddEvent = () => {
     
    this.props.dispatch({
      type: "CREATE_CALENDAR_EVENT",
      payload: {...this.state.clickEvent, designer_id: this.props.store.user.id}
    })    
    this.setState({
      open: false
    })
    this.props.closeClickEvent()
  }

  toggleProjectSelect = () => { 
     this.setState({
      allocatedToProject: !this.state.allocatedToProject
     })
  }
  handleEventChange = (event, keyname) => { 
    this.setState({
      clickEvent: {
        ...this.state.clickEvent,
        [keyname]: event.target.value
      }
    })
  }
  handleUpdateEvent = () => {
    this.props.dispatch({
      type: "UPDATE_CALENDAR_EVENT",
      payload: {...this.state.clickEvent, designer_id: this.props.store.user.id}
    })    
    this.setState({
      open: false
    })
    this.props.closeClickEvent()
  }
  handleDeleteEvent = () => {
    this.props.dispatch({
      type: "DELETE_CALENDAR_EVENT",
      payload: {id: this.props.clickEvent.id}
    })
    this.props.closeClickEvent()
  }

  render() {
    return (
      <div>
  
      <button onClick={this.handleClickOpen}>Add Events</button> 
  
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">{this.state.clickEvent.dialog}</DialogTitle>

          <DialogContent>
            Allocate to Project?
            <Switch 
              checked={this.state.allocatedToProject} 
              onChange={this.toggleProjectSelect} 
              color="primary"
            /> 
          </DialogContent>

            { this.state.allocatedToProject ? 
              <DialogContent>
                <InputLabel id="projectSelect">Select Project</InputLabel>
                  <Select 
                    onChange={(event) =>this.handleEventChange(event, 'project_id')}
                    labelId="projectSelect"
                    value={this.state.clickEvent.project_id}
                  >
                      {this.props.store.projects.map( (project) => {
                        return <MenuItem value={project.project_id}>{project.project_name}</MenuItem>
                      })}
                  </Select>
              </DialogContent>
            :
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Event Name"
                type="text"
                fullWidth
                value={this.state.clickEvent.title}
                onChange={(event) => this.handleEventChange(event, 'title' )}
                required={true}
              />
            </DialogContent>
            }
            <DialogContent>
              <TextField
                id="date"
                label="Event Date"
                type="date"
                defaultValue={this.state.clickEvent.start}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => this.handleEventChange(event, 'start')}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="hours"
                  label="Length of Event? (hours)"
                  type="number"
                  min={1} 
                  max={12}
                  fullWidth
                  required={true}
                  value={this.state.clickEvent.hoursCommitted}
                  onChange={(event) => this.handleEventChange(event, 'hoursCommitted')}
                />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            {this.state.clickEvent.id === 0 ?
              <Button onClick={this.handleAddEvent} color="primary">
                Add
              </Button>
            :
              <div>
                <Button onClick={this.handleDeleteEvent} color="primary">
                  Delete
                </Button>
                <Button onClick={this.handleUpdateEvent} color="primary">
                  Update
                </Button>
              </div>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddCalendarEvent);