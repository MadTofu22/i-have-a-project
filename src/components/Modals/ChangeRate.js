import React, {Component} from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import IconButton from '@material-ui/core/IconButton'

import mapStoreToProps from '../../../redux/mapStoreToProps';

class ChangeRate extends Component{

  state = {
    open: false,
    clickEvent: {
        dialog: 'Change Rate',
				id: 0,
				rate: '',
        renderModal: false,
  	}
  }
  componentDidUpdate = () => {
    console.log('propsinfo', this.props.clickEvent);

    if (this.props.clickEvent.id !== this.state.clickEvent.id) {
      this.setState({
        clickEvent: this.props.clickEvent,
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

//    handleAddEvent = () => {
     
//     this.props.dispatch({
//       type: "CREATE_CALENDAR_EVENT",
//       payload: {...this.state.clickEvent, designer_id: this.props.designer.id}
//     })    
//     this.setState({
//       open: false
//     })
//     this.props.closeClickEvent()
//   }
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
      type: "UPDATE_DESIGNER_RATE",
      payload: {...this.state.clickEvent, designer_id: this.props.designer.id}
    })    
    this.setState({
      open: false
    })
    this.props.closeClickEvent()
  }
//   handleDeleteEvent = () => {
//     this.props.dispatch({
//       type: "DELETE_CALENDAR_EVENT",
//       payload: {...this.props.clickEvent}
//     })
//     this.setState({
//       open: false
//     })
//     this.props.closeClickEvent()
//   }

  render() {
    return (
      <div>
          <div onClick={this.handleClickOpen}>
            <EventAvailableIcon/> Add Availability
          </div>
          

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">{this.state.clickEvent.dialog}</DialogTitle>
            {/* <DialogContent>
              <TextField
                id="date"
                label="Availability Date"
                type="date"
                defaultValue={this.state.clickEvent.start}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => this.handleEventChange(event, 'start')}
              />
            </DialogContent> */}
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="rate"
                  label="Rate (USD)"
                  type="number"
                  min={1} 
                //   max={0}
                  fullWidth
                  required={true}
                  value={this.state.clickEvent.hoursCommitted}
                  helperText="How Many hours are you available on this date?"
                  onChange={(event) => this.handleEventChange(event, 'rate')}
                />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            {/* {this.state.clickEvent.id === 0 ?
              <Button onClick={this.handleAddEvent} color="primary">
                Add
              </Button>
            :
              <div>
                <Button onClick={this.handleDeleteEvent} color="primary">
                  Delete
                </Button> */}
            <Button onClick={this.handleUpdateEvent} color="primary">
                Update
            </Button>
              {/* </div>
            } */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChangeRate);