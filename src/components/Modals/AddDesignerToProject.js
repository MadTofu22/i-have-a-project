import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import mapStoreToProps from '../../redux/mapStoreToProps';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

function AddDesignerToProject(props) {
  const [open, setOpen] = React.useState(false);
  const [designers, setDesigners] = React.useState([])



  const handleClickOpen = () => {
    setDesigners([...props.SelectedDesigners])
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePushDesigner = (designerObj) => {
      console.log(designerObj);
      
    setDesigners([...designers, designerObj])
  }
  const handleRemove = (designerObj) => {
      let deepCopy = JSON.parse(JSON.stringify(designers))
            deepCopy.splice(deepCopy.indexOf(designerObj), 1)
            setDesigners([...deepCopy])
  }
  const handleSubmit = () => {
    props.addSelectedDesigners(designers)
    setDesigners([])
    setOpen(false)
  }

  return (
    <div>

    <button onClick={handleClickOpen}>Add Team Member</button> 

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="title">Enter Team Member Info</DialogTitle>
        {props.store.designer.length > 0 ? 
            <DialogContent>
                 {props.store.designer.map( (designer) => {
                    return( 
                        <MenuItem 
                            onClick={() => handlePushDesigner(designer)} 
                        > {designer.first_name + ' ' + designer.last_name}
                        </MenuItem>
                    )
                })}
                {designers.length > 0 ?
                    designers.map(designer => {
                        return <Chip
                            label={designer.first_name + ' ' + designer.last_name}
                            onDelete={() => handleRemove(designer)}
                        />
                    })
                :
                <></>
                }
            </DialogContent>
          :
          <></>
        }
        <DialogContent>
          <DialogContentText>
             
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(mapStoreToProps)(AddDesignerToProject);