import React from "react";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/home";
import AddEmployee from "./components/Employees/AddEmployee";
import ListEmployee from "./components/Employees/ListEmployee";
import EditEmployee from "./components/Employees/EditEmployee";
import Register from "./components/Auth/Register";
import GuestRoute from "./components/GuestRoute";
import Layout from "./components/Layout";
import ForgetPassword from './components/Auth/forgetpassword';
import ResetPassword from './components/Auth/resetPassword';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Router>
      <Layout>
        <div>
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <GuestRoute path="/forget-password" component={ForgetPassword} />
          <GuestRoute path="/change-password/:slug" component={ResetPassword} />
          <GuestRoute path="/add-employee" exact component={AddEmployee} />
          <GuestRoute path="/list-employee" exact component={ListEmployee} />
           <GuestRoute path="/employee-edit/:id" exact component={EditEmployee} />
        </div>
        <Route path="/" exact component={Home} />
      </Layout>
    </Router>
  );
}

export default App;
