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
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [message, setMessage] = React.useState('');

  // potential to pass probs and trigger modal this way
  useEffect(() => {

  }, [firstName])

  const handleClickOpen = () => {
    setFirstName('');
    setOpen(true);
  };

  const handleClose = () => {
    setFirstName('');
    setOpen(false);
  };

  const createRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 8;
    let password = '';

    for (let i=0; i<passwordLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log('Random password created:', password);
    return password;
  }

  const handleSendInvites = () => {

    const inviteData = {
      userData: {
          email,
          password: createRandomPassword(),
          user_type: 'Designer',
          firstName,
          lastName,
          company: props.managerCompany,
      },
      designerData: {
          manager_id: props.managerId,
          rate,
      }
    };

    props.dispatch({type: 'REGISTER_DESIGNER', payload: inviteData});
    sendEmail(inviteData);

    setOpen(false)
    setFirstName('')
  }

  const sendEmail = (inviteData) => {
    const serviceId = 'ihap_service_1234'; // process.env.REACT_APP_EMAILJS_SERVICEID;
    const templateId = 'template_93nx0fo'; // process.env.REACT_APP_EMAILJS_TEMPLATEID;
    const templateParams = {
      to_name: firstName + '' + lastName,
      to_email: email,
      password: inviteData.userData.password,
      rate: rate,
      from_name: props.managerName,
      from_email: props.managerEmail,
      message: message,
    }

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
      case 'first':
        setFirstName(event.target.value);
        break;
      case 'last':
        setLastName(event.target.value);
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

    <Button variant="contained" color="secondary" style={{ margin: 20 }}
                onClick={handleClickOpen}>Invite Team Member</Button> 

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Team Member Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event, 'first')}
            required={true}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event, 'last')}
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