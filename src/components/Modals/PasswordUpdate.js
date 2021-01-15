import React, {useState} from 'react';
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';


const PasswordUpdate = (props) => {
    const [open, setOpen] = useState(false)
    const [password, setPass] = useState('')
    const [passwordConf, setConfPass] = useState('')
    const [passwordMatch, setMatchState] = useState(false)

    const sendNewPass = (event) => {
        event.preventDefault();
        if (passwordMatch) {
            props.dispatch({
                type: "UPDATE_DESIGNER_PASSWORD",
                payload: password
            })
        }
    }
    const handlePassChange = (event) => {
        setPass(event.target.value)
        if (event.target.value === passwordConf) {
            console.log('passwords match');
            setMatchState(true)
        } else {
            setMatchState(false)
        }
    }
    const handleConfPass = (event) => {
        setConfPass(event.target.value)
        if (event.target.value === password) {
            setMatchState(true)
        } else {
            setMatchState(false)
        }
    }
    const handleClose = () => {
        setOpen(false)
        setPass('')
        setConfPass('')
    }


    return(
    <div>

        <Button onClick={() => setOpen(true)}> Update Password </Button> 

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="title">Set New Password</DialogTitle>
              <DialogContent>
                <form onSubmit={(event) => sendNewPass(event)}>
                    <br/>
                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={(event) => handlePassChange(event)}
                        required={true}
                    />
                    <br/>   
                    <br/>
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        value={passwordConf}
                        onChange={(event) => handleConfPass(event)}
                        required={true}
                    />
                    <br/>
                    <br/>
                    <br/>
                    {passwordMatch || passwordConf.length === 0 ?
                        <></>
                    :
                        <DialogContentText style={{color: 'red'}}>
                           Your Password Doesn't Match
                        </DialogContentText>
                    }
                    <Button 
                        variant="contained"
                        type="submit"
                        value="SavePassword"
                    > Update </Button>
                </form>
              </DialogContent>
        </Dialog>
    </div>
    )
}

export default connect(mapStoreToProps)(PasswordUpdate);