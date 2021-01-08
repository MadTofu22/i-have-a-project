import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';


function FindDesignerCard(props) {

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const requestDesigner = () => {
        props.dispatch({
            type: "CREATE_CONTRACT_REQUEST",
            payload: {
                        designer: props.designeInfor,
                        search: props.search
                }
        })
    }
    const openProfileMenu = () => {
        setOpen(true)
    }

	return (
         <>
             <Card style={{width:'250px', height: '300px'}}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {props.designeInfor.designerName.first_name + ' ' + props.designeInfor.designerName.last_name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.designeInfor.photo}
                    </Typography>
                    <div style={{width: '100%', height: '150px', overflow: 'scroll'}}>
                        {props.designeInfor.skills.map(skill => {
                            return (
                                <>
                                    <Typography gutterBottom>
                                        {skill.label}
                                    </Typography>
                                    <Slider 
                                            style={{width: '90%'}}
                                            value={skill.proficiency}
                                            step={1}
                                            marks
                                            min={1}
                                            max={5}  
                                    />
                                </>
                            )
                        })}
                    </div>
                </CardContent>
                <CardActions>
                    <Button onClick={requestDesigner} size="small">Request Designer</Button>
                    <Button onClick={openProfileMenu} size="small">More</Button>
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="title">User Profile</DialogTitle>
            
                <DialogContent>
                    
                </DialogContent>
          </Dialog>
        </>
	);
}

export default connect(mapStoreToProps)(FindDesignerCard);