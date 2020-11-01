import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Message, Grid, Header, Segment, Input } from "semantic-ui-react";
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newcategory: "",
        };
        this.addcategory = this.addcategory.bind(this);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
    }

    addcategory(e) {
        axios.post('https://expense-manager-shipmnts.herokuapp.com/api/v1/user/add_category', {
            name: this.state.newcategory.value
        }).then(response => { console.log(response) });
    }
    componentWillMount() {
        axios.get('https://expense-manager-shipmnts.herokuapp.com/api/v1/user/categories', {}).then(response => { console.log(response) });
    }
    componentWillUpdate() {
        axios.get('https://expense-manager-shipmnts.herokuapp.com/api/v1/user/categories', {}).then(response => { console.log(response) });
    }
    render() {
        return <React.Fragment >
            <
            Input placeholder = 'Category Name'
        onChange = {
            (event, newValue) => this.setState({ newcategory: newValue })
        }
        / > <
        Button color = "blue"
        onClick = { this.addcategory } > Add Category < /Button> < /
        React.Fragment >
    }
}
export default Dashboard;