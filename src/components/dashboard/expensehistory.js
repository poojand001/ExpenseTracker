import React, { Component } from "react";
import { Button, Modal, Message, Header, Grid, Table } from "semantic-ui-react";
import axios from "axios";
import FlashMessage from "react-flash-message";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
class ExpenseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      open: false,
      startdate: "",
      enddate: "",
      expense: [],
      success: false,
    };
    this.TrackExpense = this.TrackExpense.bind(this);
    this.getDate = this.getDate.bind(this);
  }
  getDate(date) {
    var dt = new Date(date),
      mnth = ("0" + (dt.getMonth() + 1)).slice(-2),
      day = ("0" + dt.getDate()).slice(-2);
    return [dt.getFullYear(), mnth, day].join("-");
  }
  TrackExpense(e) {
    var startdate = this.getDate(this.state.startdate.value);
    var enddate = this.getDate(this.state.enddate.value);
    axios.defaults.headers.common["Authorization"] = `${this.props.token}`;
    var url;
    if (this.props.overall) {
      url =
        "https://expense-manager-shipmnts.herokuapp.com/api/v1/user/expense_details";
    } else {
      url =
        "https://expense-manager-shipmnts.herokuapp.com/api/v1/user/expense_details/" +
        `${this.props.category}`;
    }

    axios
      .post(url, {
        start_date: startdate,
        end_date: enddate,
      })
      .then((response) => {
        console.log(response["data"]);
        this.setState({
          message: "Track of expense",
          expense: response["data"],
          success: true,
        });
      })
      .catch((response) => {
        this.setState({ message: response.message, success: false });
      });
  }
  render() {
    console.log(this.state.expense);
    let triggeringevent;
    if (this.props.overall) {
      triggeringevent = (
        <Button color="green" fluid size="medium">
          Track Expense{" "}
        </Button>
      );
    } else {
      triggeringevent = (
        <Button basic color="green">
          {" "}
          Track{" "}
        </Button>
      );
    }
    return (
      <React.Fragment>
        <Modal
          onClose={() => this.setState({ open: false, expense: [] })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={triggeringevent}
        >
          {" "}
          <Modal.Header color="blue"> Track Expense </Modal.Header>{" "}
          <Modal.Content>
            <Modal.Description>
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  {" "}
                  <Grid.Column>
                    {" "}
                    <Header as="h4"> Start Date </Header>
                    <SemanticDatepicker
                      onChange={(event, newValue) =>
                        this.setState({ startdate: newValue })
                      }
                    />
                  </Grid.Column>{" "}
                  <Grid.Column>
                    {" "}
                    <Header as="h4"> End Date </Header>
                    <SemanticDatepicker
                      onChange={(event, newValue) =>
                        this.setState({ enddate: newValue })
                      }
                    />
                  </Grid.Column>{" "}
                </Grid.Row>
              </Grid>{" "}
              {this.state.expense.length ? (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell> Description </Table.HeaderCell>{" "}
                      <Table.HeaderCell> Amount </Table.HeaderCell>{" "}
                      <Table.HeaderCell> Date Added </Table.HeaderCell>{" "}
                      {this.props.overall ? (
                        <Table.HeaderCell> Category </Table.HeaderCell>
                      ) : (
                        ""
                      )}{" "}
                    </Table.Row>{" "}
                  </Table.Header>
                  <Table.Body>
                    {" "}
                    {this.state.expense.map((expense, index) => (
                      <Table.Row key={index}>
                        <Table.Cell> {expense.description} </Table.Cell>{" "}
                        <Table.Cell> {expense.amount} </Table.Cell>{" "}
                        <Table.Cell> {expense.date_added} </Table.Cell>
                        {this.props.overall ? (
                          <Table.Cell> {expense.category} </Table.Cell>
                        ) : (
                          ""
                        )}{" "}
                      </Table.Row>
                    ))}{" "}
                  </Table.Body>{" "}
                </Table>
              ) : (
                ""
              )}{" "}
            </Modal.Description>{" "}
          </Modal.Content>{" "}
          <Modal.Actions>
            <Button color="blue" onClick={this.TrackExpense}>
              Submit{" "}
            </Button>{" "}
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
          </Modal.Actions>{" "}
        </Modal>{" "}
      </React.Fragment>
    );
  }
}
export default ExpenseHistory;
