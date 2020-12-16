import React from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {makeStyles} from '@material-ui/core'

function AddCalendarEvent(props) {
  const [open, setOpen] = React.useState(false);
  const [event, setName] = React.useState('')

  const handleClickOpen = () => {
    setName('')
    setOpen(true);
  };

  const handleClose = () => {
    setName('')
    setOpen(false);
  };

  const handleAddPlaylist = () => {
      //dispatch
    setOpen(false)
    setName('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(2),
        width: theme.spacing(25),
        height: theme.spacing(25),
      },
    },
    paper: {
      backgroundColor:  '#008183',
      "&:hover, &:focus": {
        backgroundColor: '#369091'
      },
      color: 'white',
      textAlign: 'center',
      paddingTop: '10px'
    }
  }));

  const classes = useStyles();


  return (
    <div>

    <button onClick={handleClickOpen}>Add Events</button> 

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Event Name"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event)}
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
            <input type="date" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPlaylist} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect()(AddCalendarEvent);