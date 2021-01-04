import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import mapStoreToProps from '../../redux/mapStoreToProps';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddTeamMember(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [inviteData, setInviteData] = React.useState({
    invitee: {
        to_name: '',
        to_email: '',
        rate: 0,
    },
    manager: {
      from_name: props.managerName,
      from_email: props.managerEmail,
      message: '',
    },
  });

  // potential to pass probs and trigger modal this way
  useEffect(() => {

  }, [name])

  const handleClickOpen = () => {
    setName('');
    setOpen(true);
  };

  const handleClose = () => {
    setName('');
    setOpen(false);
  };

  const handleSendInvites = () => {
    setInviteData({
      invitee: {
        to_name: name,
        to_email: email,
        rate: rate,
      },
      manager: {
        from_name: props.managerName,
        from_email: props.managerEmail,
        message: message,
      },
    })
    
    //dispatch
    setOpen(false)
    setName('')
  }

  const handleChange = (event, type) => {
    console.log('in handleChange', type, event.target.value);
    switch (type) {
      default:
        console.log('In handleChanger, something went wrong:', type, event);
        break;
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'rate':
        setRate(event.target.value);
        break;
      case 'message':
        setMessage(event.target.value);
        break;
    }
  }

  return (
    <div>

    <button onClick={handleClickOpen}>Invite Team Member</button> 

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Team Member Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Designer Name"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event, 'name')}
            required={true}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Designer Email"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event, 'email')}
            required={true}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="rate"
            label="Rate per hour"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event, 'rate')}
            required={true}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Short Message"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event, 'message')}
            required={true}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
             
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendInvites} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(mapStoreToProps)(AddTeamMember);