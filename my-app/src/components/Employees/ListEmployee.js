import React, { Component } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import EmployeeService from './EmployeeService';
import {Link} from 'react-router-dom';
const employeeService = new EmployeeService();
class ListEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Employeelist: [],
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
  };
  handleInput = e => {
    e.preventDefault();
  };
  componentDidMount() {
    let thisComponent = this;
    employeeService.getEmployees()
      .then(function (response) {
        thisComponent.setState({ Employeelist: response.data });
      })
  }
  handleDelete(id)
  {
    let selfComponent = this;
      employeeService.deleteEmployee(id).then(function (response) {
        NotificationManager.warning("Employee Deleted Successfully");
        selfComponent.setState({ Employeelist: response.data });
      })
    
  }


  render() {
    return (
      <div className="content">
        <NotificationContainer />
        <form onSubmit={this.handleForm}>
          <div className="card">
            <div className="card-header text-center">Employee List</div>
            <div className="card-body table-responsive">
              <div className="row" style={{ marginTop: 20 }}>
                <div className="col-sm-12">
                  <table className="table" >
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th >Email</th>
                        <th>Company</th>
                        <th>Address</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Employeelist.map(data =>
                        <tr key={data.id}>
                          <td>{data.firstname + ' ' + data.lastname}</td>
                          <td >
                           {data.email}
                          </td>
                          <td>{data.company}</td>
                      <td> { ((data.address).length > 100) ? 
    (((data.address).substring(0,100-3)) + '  ....') : 
    data.address } 
   </td>
                      <td>{data.mobile}</td>
                      <td>{data.city}</td>
                      <td><Link  className="btn btn-primary"  to={"/employee-edit/"+data.id}>Edit</Link>  <button className="btn btn-danger"  onClick={(e)=> this.handleDelete(data.id) }> Delete</button></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </form>
      </div>
    );
  }
}


export default ListEmployee;

