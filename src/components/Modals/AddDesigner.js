import React from 'react';
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import mapStoreToProps from '../../redux/mapStoreToProps';
import MenuItem from '@material-ui/core/MenuItem';

function AddDesigner(props) {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddDesigner = (designerObj) => {
    props.dispatch({
      type: "ADD_DESIGNER_TO_PROJECT",
      payload: {...designerObj, project_id: props.project_id}
    })
    setOpen(false);
  }
  

  return (
    <div>

    <button onClick={handleClickOpen}>Add Team Member</button> 

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="title">Select Team Members</DialogTitle>
        {props.store.designer.length > 0 ? 
            <DialogContent>
                 {props.store.designer.map( (designer) => {
                    return( 
                        <MenuItem 
                            onClick={() => handleAddDesigner(designer)} 
                            key={designer.designer_id}
                        > {designer.first_name + ' ' + designer.last_name}
                        </MenuItem>
                    )
                })}
            </DialogContent>
          :
          <></>
        }
      </Dialog>
    </div>
  );
}

export default connect(mapStoreToProps)(AddDesigner);