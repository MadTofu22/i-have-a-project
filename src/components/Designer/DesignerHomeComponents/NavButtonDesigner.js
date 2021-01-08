import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class NavButton extends Component {
    handleClick = () => {
        this.props.history.push(this.props.page.path);
        window.scrollTo(0,0);
    }

    render () {
        return (
            <>
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
            </>
        );
    }
}

export default withRouter(NavButton);