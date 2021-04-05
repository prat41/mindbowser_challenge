

import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import EmployeeService from './EmployeeService';
const employeeService = new EmployeeService();
class AddEmployee extends Component {
    constructor(props) {
    super(props);
    this.state = {
      firstname : "",
      lastname : "",
      email : "",
      password : "",
      address : "",
      dob : "",
      company : "",
      mobile : "",
      city : "",
      errors: {}
    };
  }

  handleForm = e => {
    e.preventDefault();
    const data = new FormData()

    data.append('firstname', this.state.firstname)
    data.append('lastname', this.state.lastname)
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    data.append('address', this.state.address)
    data.append('dob', this.state.dob)
    data.append('company', this.state.company)
    data.append('mobile', this.state.mobile)
    data.append('city', this.state.city)
    
    //axios 
    
    employeeService.createEmployee(data).then(result => {
      console.log(result);
      NotificationManager.success("Employee Added Sussceefully");
    })
    .catch(err => {
      if (err.response && err.response.status === 400)
        NotificationManager.error(err.response.data.message);
      else
        NotificationManager.error("Something Went Wrong");
      this.setState({ errors: err.response })
    });
};
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  
  render() {
    return (
      <div className="content">
        <NotificationContainer />
                <form onSubmit={this.handleForm}>
                    <div className="card">
                        <div className="card-body">
                        <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-4">
                        <div className="form-group">
                                <label >firstname</label>
                                <input type="text" required name="firstname" value={this.state.firstname} onChange={this.handleInput} className="form-control" placeholder="Enter Firstname" required />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label >lastname</label>
                                <input type = "text" value={this.state.lastname}  name="lastname" onChange={this.handleInput} className="form-control" placeholder="Enter lastname"  required></input>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >email</label>
                                <input type="text" value={this.state.email}  name="email" onChange={this.handleInput} className="form-control" placeholder="Enter email" required />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Address</label>
                                <textarea type="text" value = {this.state.address} name="address" onChange={this.handleInput} className="form-control" placeholder="Enter Adress" required />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Mobile</label>
                                <input type="text" value={this.state.mobile}   name="mobile" onChange={this.handleInput} className="form-control" placeholder="Enter mobile" required/>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Company</label>
                                <input type="text" value={this.state.company}  name="company" onChange={this.handleInput} className="form-control" placeholder="Enter company" required />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >Password</label>
                                <input type="password" value={this.state.password}  name="password" onChange={this.handleInput} className="form-control" placeholder="Enter password" required />
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >City</label>
                                <input type = "text" value={this.state.city}  name="city" onChange={this.handleInput} className="form-control" placeholder="Enter city" required></input>
                            </div>
                            </div>
                            <div className="col-sm-4">
                            <div className="form-group">
                                <label >City</label>
                                <input type = "date" value={this.state.dob}  name="dob" onChange={this.handleInput} className="form-control" placeholder="Enter dob" required ></input>
                            </div>
                            </div>
                        </div>
                        <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center" >Add Employee</button></div>
                    </div>
                    </div>

                </form>
            </div>
    );
  }
}


export default AddEmployee;

