import React, {useState} from 'react'
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';



const ProjectActionMenu = (props) =>{

    const [menuPosition, setMenuPosition] = useState(null);
    const [hoursModalOpen, setModalOpen] = useState(false)
    const [estHours, setHours] = useState('')

    const handleClickOpen = (event) => {
        if (menuPosition) {
            return;
          }
          event.preventDefault();
          console.log(event);
          
          setMenuPosition({
      
            top: event.clientY,
            left: event.clientX
          });
    };

    const handleItemClick = () => {
        setModalOpen(false)
        setHours('')
    }

    const openEditMenu = () => {
        setModalOpen(true)
        setHours('')
    }
    const updateEstHours = () => {
        props.dispatch({
            type: "UPDATE_DESIGNER_HOURS",
            payload: {
                designer_id: props.rowProps.row.id,
                project_id: props.project_id,
                hours_est: estHours
            }
        })
        handleItemClick()
    }
    const handleSetHours = (event) => {
        console.log('hours set', event.target.value, estHours);
        
        setHours(event.target.value)
    }

    const removeDesigner = () => {
        props.dispatch({
            type: "REMOVE_DESIGNER_FROM_PROJECT",
            payload: {
                designer_id: props.rowProps.row.id,
                project_id: props.project_id
            }
        })
        handleItemClick()
    }


    return(
        <>
                <MoreHorizIcon onClick={handleClickOpen}/>
            <Menu
                open={!!menuPosition}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
            >
                <MenuItem onClick={openEditMenu}>Edit Est. Hours</MenuItem>
                <MenuItem onClick={removeDesigner}>Remove Designer</MenuItem>
            </Menu>
            <Dialog 
                open={hoursModalOpen} 
                onClose={() => handleItemClick()} 
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="title">Update estimated hours for {props.rowProps.row.first_name + ' ' + props.rowProps.row.last_name}</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(event) => handleSetHours(event)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Hours Estimate"
                        type="number"
                        defaultValue={props.rowProps.row.hours_est}
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                        <Button
                            onClick={handleItemClick}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={updateEstHours}
                        >
                            Save
                        </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default connect(mapStoreToProps)(ProjectActionMenu)