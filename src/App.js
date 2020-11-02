import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DashBoard from "./components/dashboard/DashBoard";
class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />{" "}
        <Route exact path="/login" component={Login} />{" "}
        <Route exact path="/register" component={Register} />{" "}
        <Route exact path="/dashboard" component={DashBoard} />{" "}
      </Router>
    );
  }
}
export default App;