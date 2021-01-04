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

// Import and initialize emailjs
import emailjs, {init} from 'emailjs-com';
init("user_KwJe2ulviLUzklqweZQDa");

function AddTeamMember(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [message, setMessage] = React.useState('');

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
    const templateParams = {
      to_name: name,
      to_email: email,
      password: '',
      rate: rate,
      from_name: props.managerName,
      from_email: props.managerEmail,
      message: message,
    }

    sendEmail(templateParams);

    setOpen(false)
    setName('')
  }

  const sendEmail = (templateParams) => {
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICEID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATEID;

    emailjs.send(serviceId, templateId, templateParams)
      .then(response => {
        console.log('SUCCESS! Email sent with the following params', templateParams);
      }, error => {
        console.log('Error in handleSendInvites:', error);
    });
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