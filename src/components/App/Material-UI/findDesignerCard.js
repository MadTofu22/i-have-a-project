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

import Divider from '@material-ui/core/Divider'
// Import and initialize emailjs
import emailjs, {init} from 'emailjs-com';
init("user_KwJe2ulviLUzklqweZQDa");

function FindDesignerCard(props) {

    const [open, setOpen] = React.useState(false);
    const [requested, setRequested] = React.useState(false);


    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }

    const requestDesigner = () => {
        console.log('in find designers, designerInfo =', props.designerInfo);
        props.dispatch({
            type: "CREATE_CONTRACT_REQUEST",
            payload: {
                        designer: props.designerInfo,
                        search: props.search
                }
        });

        // props.dispatch({
        //     type: "FETCH_REQUEST_INFO",
        //     payload: {
        //         manager_id: props.designerInfo.designerInfo.manager_id
        //     }
        // });
        
        // const serviceId = 'ihap_service_1234'; 
        // const templateId = 'template_sendRequest';
        // const templateParams = {
        //     designer_name: props.designerInfo.designerName.first_name + ' ' + props.designerInfo.designerName.last_name,
        //     to_manager_name: props.designerInfo.managerInfo.first_name + ' ' + props.designerInfo.managerInfo.lastName,
        //     to_email: props.designerInfo.managerInfo.email,
        //     software: props.projectInfo.software_label,
        //     designer_rate: props.designerInfo.designerInfo.rate,
        //     from_name: props.requestingManagerInfo.first_name + ' ' + props.requestingManagerInfo.last_name,
        //     from_email: props.requestingManagerInfo.email,
        //     project_start: props.projectInfo.start,
        //     project_end: props.projectInfo.end,
        //     project_hours: props.projectInfo.hours,
        //     project_description: props.projectInfo.desc, 
        // }
        
        // console.log('attempting to send email, templateParmas=', templateParams);

        // emailjs.send(serviceId, templateId, templateParams)
        //     .then(response => {
        //     console.log('SUCCESS! Email for a contract request sent with the following params', templateParams);
        //     }, error => {
        //     console.log('Error in requestDesigner:', error);
        // });

        setRequested(true)
    }

    const openProfileMenu = () => {
        setOpen(true)
        props.dispatch({
            type: "FETCH_PROFILE",
            payload: props.designerInfo.designerInfo.designer_id
        })
    }

	return (
         <div className="findDesignerCard">
             <Card style={{width:'250px', height: '300px'}}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        
                        {props.designerInfo.designerName.first_name + ' ' + props.designerInfo.designerName.last_name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.designerInfo.photo}
                    </Typography>
                    <div style={{width: '100%', height: '150px', overflow: 'scroll'}}>
                        {props.designerInfo.skills.map(skill => {
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
                    <Button onClick={requestDesigner} disabled={requested} size="small">{requested ? 'Request Sent' : 'Request Designer'}</Button>
                    <Button onClick={openProfileMenu} size="small">More</Button>
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="title">User Profile</DialogTitle>
            
                <DialogContent>
                <div className="myProfileWrap">
					<div className="left-ProfileColumn">
	
						<div className="profileImg">
							{props.store.profile.designer ?
								<img
									src={props.store.profile.designer.photo}
									alt="The User's avatar"
								></img>	
							:
								<img
									alt="No image added"
								></img>
							}
						</div>
						<div className="profileName">
							{props.designerInfo.designerName.first_name} {props.designerInfo.designerName.last_name}
						</div>
						<br/>
						<Divider className="menuDivider"  variant="middle"/>
						<div className="profileContactInfo">
							<div className="sectionHeader">Contact Info: </div>
							<div className="sectionList">
								<p>Manager Email: {props.designerInfo.managerInfo ? props.designerInfo.managerInfo.email : ''}</p>
								<p>Linkedin URL: {props.store.profile.designer ? props.store.profile.designer.linkedin : ''}</p>
							</div>
						</div>
						<div>
							<div className='sectionHeader'>Career History: </div>
								<div className="sectionList">
									{props.store.profile.career ?
									props.store.profile.career.map((career, index) => {
										return <p className='careerItem' key={index}>{career.title} at {career.location}</p>
									})
									:
									'No Career History Added'
									}
								</div>
						</div>
						<div>
							<div className='sectionHeader'>Education:</div>
								<div className="sectionList">
							{props.store.profile.education ?
								props.store.profile.education.map((degree, index) => {
									return <p className='educationItem' key={index}>{degree.degree} at {degree.location}</p>
								})
								:
								'No Education History Added'
							}
								</div>
						</div>
					</div>
					<div className="right-ProfileColumn">
							<div >
								<div  className='sectionHeader'>Software:</div>
									<div className="sectionList">
										{props.store.profile.software ?
										props.store.profile.software.map((software, index) => {
											if (software.proficient) {
												return <p className='softwareItem' key={index}>{software.label}</p>
											}
										})
										:
										'No Proficient Software Listed'
										}
									</div>						
							</div>
							<div>
								<div className='sectionHeader'>Skills:</div>
										<br/>
										<div className="sectionList" style={{overflow: 'scroll'}}>
								{props.store.profile.skills ?
									props.store.profile.skills.map((skill) => {
										return (<>
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
												</>)
					
									})
									:
									'No Additional Skills Added'
								}
								 </div>
							</div>
					</div>
				</div>
                </DialogContent>
          </Dialog>
        </div>
	);
}

export default connect(mapStoreToProps)(FindDesignerCard);