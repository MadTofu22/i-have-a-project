import React, {Component} from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddCalendarEvent extends Component{

  state = {
    open: false,
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

   handleChange = (event) => { 
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
  
      <button onClick={this.handleClickOpen}>Add Events</button> 
  
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.state.clickEvent.dialog}</DialogTitle>
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
          <DialogContent>
            <DialogContentText>
               
            </DialogContentText>
            <select>
                  {/* need map of user's projects and personal time option */}
                <option>test</option>
            </select>
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Select Project or Event Type 
            </DialogContentText>
              <input type="date" value='12/21/2020' onChange={this.handleChange}/>
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

export default connect()(AddCalendarEvent);