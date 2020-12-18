import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class FindNewDesigner extends Component {

    state = {
      startDate: '',
      hoursOfCommitment: '',
      deadline: '',
      software: '',
    };
  
    searchDesigner = () =>

    handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.searchDesigner}>
            <h1>Find New Designer</h1>
            <div>
              <label htmlFor="startDate">
                Start Date:
                <input
                  type="text"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleInputChangeFor('startDate')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="hoursOfCommitment">
                Hours Of Commitment:
                <input
                  type="text"
                  name="hoursOfCommitment"
                  value={this.state.hoursOfCommitment}
                  onChange={this.handleInputChangeFor('hoursOfCommitment')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="deadline">
                Project Deadline:
                <input
                  type="text"
                  name="deadline"
                  value={this.state.passwordConfirmation}
                  onChange={this.handleInputChangeFor('deadline')}
                />
              </label>
            </div>

            <div>
              <label htmlFor="software">
                Fluent Softwares
                <input
                  type="text"
                  name="software"
                  value={this.state.software}
                  onChange={this.handleInputChangeFor('software')}
                />
              </label>
            </div>
    

            <div>
           
              <input
                className="register"
                type="submit"
                name="submit"
                value="Register"
                
              />
            </div>
          </form>
       
        </div>
      );
    }
  }
  


export default withRouter(connect(mapStoreToProps)(FindNewDesigner));