import React, {Component} from 'react';
import {withRouter} from 'react-router';
import { theme } from '../../App/Material-UI/MUITheme';
import { ThemeProvider, Button } from '@material-ui/core';

class NavButton extends Component {

    // This function handles the click event for each button.
    handleClick = () => {
        this.props.history.push(this.props.page.path); // Navigate to the next page
        window.scrollTo(0,0); // Return to the top of the page
    }

    render () {
        
        return (
            <ThemeProvider theme={theme}>
                
            <Button 
          position="flex" 
          color="secondary" 
          className="app-header">
            <div 
                className={
                    this.props.location.pathname === this.props.page.path ?
                    'navBtnClicked'
                    :
                    'navBtn'
                } 
                onClick={this.handleClick} 
            >
                <h2 className='navBtnLabel'>{this.props.page.label}</h2>
            </div>
            </Button>
            </ThemeProvider>
        );
    }
}

export default withRouter(NavButton);