import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios"
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            UserName: "",
            isRegistered: false,
            message: ""
        };
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser() {
        axios.post('https://expense-manager-shipmnts.herokuapp.com/api/v1/register', { user_name: this.state.UserName.value, email: this.state.Email.value, password: this.state.Password.value })
            .then(response => { this.setState({ isRegistered: true, message: "User has been added" }) })
            .catch(response => { this.setState({ message: "User has not been added" }) });
    }
    render() {
        let show;
        if (this.state.isRegistered) {
            show = < Link to = "/login" > < /Link>
        } else {
            show = < Grid centered columns = { 2 } >
                <
                Grid.Column >
                <
                Header as = "h2"
            textAlign = "center" >
                Register <
                /Header> <
            Segment >
                <
                Form size = "large" >
                <
                Form.Input fluid icon = "user"
            iconPosition = "left"
            placeholder = "User Name"
            onChange = {
                (event, newValue) => this.setState({ UserName: newValue })
            }
            /> <
            Form.Input fluid icon = "user"
            iconPosition = "left"
            placeholder = "Email address"
            onChange = {
                (event, newValue) => this.setState({ Email: newValue })
            }
            /> <
            Form.Input fluid icon = "lock"
            iconPosition = "left"
            placeholder = "Password"
            type = "password"
            onChange = {
                (event, newValue) => this.setState({ Password: newValue })
            }
            />

            <
            Button color = "blue"
            fluid size = "large"
            onClick = { this.registerUser } >
                Register <
                /Button> < /
            Form > <
                /Segment> < /
            Grid.Column > < /
            Grid >
        }
        return (
            show
        )
    }
}
export default Register;