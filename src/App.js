import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
    render() {
        return ( <
            Router >
            <
            Route exact path = "/"
            component = { Login }
            /> <
            Route exact path = "/login"
            component = { Login }
            /> <
            Route exact path = "/register"
            component = { Register }
            />  < /
            Router >
        );
    }
}
export default App;