import {Route, BrowserRouter, Switch} from 'react-router-dom';
import React from 'react';
import Signup from "./signup";
import Login from "./login";
import User from "./user";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/signUp" component={Signup}/>
            <PrivateRoute path="/user" component={User}/>
            <Route path="/edit" component={Signup}/>
            <Route path="/editUserDetails/:id" component={Signup} />
            <Route path="/dashboard" component={Dashboard}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;