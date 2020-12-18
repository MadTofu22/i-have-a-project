import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class FindNewDesigner extends Component {

    state = {
      startDate: '',
      hoursOfCommitment: '',
      deadline: '',
      software: '',
    };
  
    // searchDesigner = () =>

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
              <h4>Fluent Softwares</h4>
              <input type="checkbox" value="AutoCad" name="AutoCad"/>
              <label for="AutoCad">AutoCAD</label>
              <input type="checkbox" value="SketchUp Pro" name="SketchUp Pro"/>
              <label for="SketchUp Pro">SketchUp Pro</label>
              <input type="checkbox" value="TurboCAD" name="TurboCAD"/>
              <label for="TurboCAD">TurboCAD</label>
              <input type="checkbox" value="Autodesk Revit" name="Autodesk Revit"/>
              <label for="Autodesk Revit">Autodesk Revit</label>
            </div>
    

            <div>
           
              <input
                className="Search"
                type="submit"
                name="submit"
                value="Search"
                
              />
            </div>
          </form>
       
       <table id="designerSearchTable"> 
       
        <th>(Designer Search Outputs)</th>
         <th> Designer Name </th>
         <th> Rate </th>
         <th> Skills </th>
         <th> Education </th>
         
          </table>

        </div>
      );
    }
  }
  


export default withRouter(connect(mapStoreToProps)(FindNewDesigner));