import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Message, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios"
import FlashMessage from 'react-flash-message'
import Dashboard from "../dashboard/DashBoard"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            isLoggedIn: false,
            token: "",
            message: "",
        };
        this.handlelogin = this.handlelogin.bind(this);
    }
    handlelogin() {
        axios.post('https://expense-manager-shipmnts.herokuapp.com/api/v1/login', { email: this.state.Email.value, password: this.state.Password.value })
            .then(data => this.setState({ token: data["data"]["token"], isLoggedIn: true, message: "Successfully Logged In" }))
            .catch(this.setState({ message: "either username or password is incorrect" }));
    }
    render() {
        let isLogged = this.state.isLoggedIn;
        let show;
        if (isLogged) {
            show = < Dashboard token = { this.state.token }
            user = { this.state.Email.value }
            />
        } else {
            show = < Grid centered columns = { 2 } > <
                Grid.Column >
                <
                Header as = "h2"
            textAlign = "center" >
                Login <
                /Header> <
            Segment >
                <
                Form size = "large" >
                <
                Form.Input fluid icon = "user"
            iconPosition = "left"
            placeholder = "Email address"
            onChange = {
                (event, newValue) => this.setState({ Email: newValue })
            }
            / > <
            Form.Input fluid icon = "lock"
            iconPosition = "left"
            placeholder = "Password"
            type = "password"
            onChange = {
                (event, newValue) => this.setState({ Password: newValue })
            }
            / > <
            Button color = "blue"
            fluid size = "large"
            onClick = { this.handlelogin } >
                Login <
                /Button> < /
            Form > <
                /Segment>   <
            FlashMessage duration = { 5000 } >
                <
                strong > { this.state.message } < /strong> < /
            FlashMessage >
                <
                Message >
                <
                Link to = "/register" > Register < /Link> < /
            Message > < /
            Grid.Column > < /
            Grid >
        }
        return (
            show
        );
    }
}
export default Login;