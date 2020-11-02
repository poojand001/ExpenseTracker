import React, { Component } from "react";
import axios from "axios";
import "./dashboard.css";
import { Link } from "react-router-dom";
import {
  Button,
  Message,
  Grid,
  Header,
  Input,
  Card,
  Menu,
} from "semantic-ui-react";
import AddExpense from "./addexpense";
import ExpenseHistory from "./expensehistory";
import FlashMessage from "react-flash-message";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newcategory: "",
      categories: [],
      message: "",
      success: false,
    };
    this.addcategory = this.addcategory.bind(this);
    this.getcategory = this.getcategory.bind(this);
    axios.defaults.headers.common["Authorization"] = `${this.props.token}`;
  }

  addcategory(e) {
    axios
      .post(
        "https://expense-manager-shipmnts.herokuapp.com/api/v1/user/add_category",
        {
          name: this.state.newcategory.value,
        }
      )
      .then((response) => {
        this.setState({ newcategory: "", message: "", success: true });
        this.getcategory();
      })
      .catch((response) => {
        this.setState({ message: response.message, success: false });
      });
  }
  getcategory() {
    axios
      .get(
        "https://expense-manager-shipmnts.herokuapp.com/api/v1/user/categories",
        {}
      )
      .then((data) => {
        this.setState({ categories: data["data"]["categories"] });
      });
  }
  componentWillMount() {
    this.getcategory();
  }
  render() {
    return (
      <React.Fragment>
        <Link to="/login">
          {" "}
          <Menu secondary>
            <Menu.Menu position="right">
              <Menu.Item name="logout" onClick={this.handleLogout} />{" "}
            </Menu.Menu>{" "}
          </Menu>{" "}
        </Link>{" "}
        <Header as="h1" textAlign="center" color="blue">
          Expense Tracker{" "}
        </Header>{" "}
        <Header as="h2" textAlign="center" color="red">
          Categories{" "}
        </Header>
        <div id="container">
          {" "}
          <Card.Group>
            {" "}
            {this.state.categories.map((category, index) => (
              <Card>
                <Card.Content>
                  <Card.Header> {category} </Card.Header>{" "}
                  <Card.Description>
                    Please click the below buttons to add or track expense for{" "}
                    {category}{" "}
                  </Card.Description>{" "}
                </Card.Content>{" "}
                <Card.Content extra>
                  <div className="ui two buttons">
                    <AddExpense category={category} token={this.props.token} />{" "}
                    <ExpenseHistory
                      category={category}
                      token={this.props.token}
                      overall={false}
                    />{" "}
                  </div>{" "}
                </Card.Content>{" "}
              </Card>
            ))}{" "}
          </Card.Group>
          <Grid divided="vertically">
            <Grid.Row columns={6}>
              {" "}
              <Grid.Column>
                {" "}
                <Input
                  placeholder="Category Name"
                  onChange={(event, newValue) =>
                    this.setState({ newcategory: newValue })
                  }
                />{" "}
              </Grid.Column>{" "}
              <Grid.Column>
                {" "}
                <Button
                  color="blue"
                  fluid
                  size="medium"
                  onClick={this.addcategory}
                >
                  Add Category{" "}
                </Button>{" "}
              </Grid.Column>{" "}
              <Grid.Column>
                {" "}
                <ExpenseHistory
                  category={"none"}
                  token={this.props.token}
                  overall={true}
                />{" "}
              </Grid.Column>{" "}
            </Grid.Row>{" "}
          </Grid>{" "}
          {this.state.message !== "" ? (
            <FlashMessage duration={5000}>
              {" "}
              {this.state.success ? (
                <Message positive>
                  {" "}
                  <Message.Header> {this.state.message} </Message.Header>{" "}
                </Message>
              ) : (
                <Message negative>
                  {" "}
                  <Message.Header> {this.state.message} </Message.Header>{" "}
                </Message>
              )}{" "}
            </FlashMessage>
          ) : (
            ""
          )}{" "}
        </div>
      </React.Fragment>
    );
  }
}
export default Dashboard;
