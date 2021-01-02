import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ProjectActionMenu(props) {

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

    }

    const openEditMenu = () => {
        setModalOpen(true)

    }
    const removeDesigner = () => {
        console.log(props.props.row);
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
                <MenuItem onClick={handleItemClick}>Remove Designer</MenuItem>
            </Menu>
            <Dialog open={hoursModalOpen} onClose={() => setModalOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="title">Update estimated hours for {props.props.row.first_name + ' ' + props.props.row.last_name}</DialogTitle>
                <TextField
                    onChange={(event) => setHours(event.target.value)}
                >
                    
                </TextField>

            </Dialog>
        </>
    )
}
