import React, {Component} from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton'

import mapStoreToProps from '../../redux/mapStoreToProps';

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


   handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

   handleClose = () => {
    this.setState({
      open: false
    })
  };


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
      payload: {rate: this.state.clickEvent.rate, designer_id: this.props.designer.id}
    })    
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div>
          <IconButton onClick={this.handleClickOpen}>
            <EditIcon/>
          </IconButton>
          

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">{this.state.clickEvent.dialog}</DialogTitle>
          
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
                  // FLAG
                  defaultValue={this.props.rate}
                  helperText="What hourly rate would you like to charge for this designer?"
                  onChange={(event) => this.handleEventChange(event, 'rate')}
                />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>

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