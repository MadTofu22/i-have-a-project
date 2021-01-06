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


function FindDesignerCard(props) {

    const requestDesigner = () => {
        this.props.dispatch({
            type: "",
            payload: props.designeInfor
        })
    }
    

	return (
         
             <Card >
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {props.designeInfor.designerName.first_name + ' ' + props.designeInfor.designerName.last_name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.designeInfor.photo}
                    </Typography>
                    {props.designeInfor.skills.map(skill => {
                        return (
                            <>
                                <Typography gutterBottom>
                                    {skill.label}
                                </Typography>
                                <Slider 
                                        value={skill.proficiency}
                                        step={1}
                                        marks
                                        min={1}
                                        max={5}  
                                />
                            </>
                        )
                    })}

                </CardContent>
                <CardActions>
                    <Button onClick={requestDesigner} size="small">Request Designer</Button>
                </CardActions>
            </Card>
	);
}

export default connect(mapStoreToProps)(FindDesignerCard);