import React, {Component} from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import mapStoreToProps from '../../../redux/mapStoreToProps';



import Switch from '@material-ui/core/Switch';

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
				renderModal: false
		}
  }
  componentDidUpdate = () => {
    console.log('propsinfo', this.props.clickEvent);

    if (this.props.clickEvent.id !== this.state.clickEvent.id) {
      console.log('update')
      this.setState({
        clickEvent: this.props.clickEvent
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
      //dispatch
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

      }
    })
  }

  render() {
    return (
      <div>
  
      <button onClick={this.handleClickOpen}>Add Events</button> 
  
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.clickEvent.dialog}</DialogTitle>

          <DialogContent>
            Allocate to Project?
            <Switch onChange={this.toggleProjectSelect}/> 
          </DialogContent>

            { this.state.allocatedToProject ? 
              <DialogContent>
                <select onChange={(event) =>this.handleEventChange(event, 'project_id')}>
                    <option value="">select a project</option>
                    {this.props.store.projects.map( (project) => {
                      return <option value={project.project_id}>{project.project_name}</option>
                    })}
                </select>
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
                onChange={(event) => this.handleChange(event)}
                required={true}
              />
            </DialogContent>
            }
            <DialogContent>
              <TextField
                id="date"
                label="Event Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
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
                />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleAddEvent} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddCalendarEvent);