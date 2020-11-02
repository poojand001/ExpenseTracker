import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  TextArea,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import FlashMessage from "react-flash-message";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      open: false,
      amount: 0,
      description: "",
    };
    this.SubmitExpense = this.SubmitExpense.bind(this);
  }

  SubmitExpense(e) {
    axios.defaults.headers.common["Authorization"] = `${this.props.token}`;
    axios
      .post(
        "https://expense-manager-shipmnts.herokuapp.com/api/v1/user/add_expense",
        {
          category: this.props.category,
          amount: this.state.amount,
          description: this.state.description,
        }
      )
      .then((response) => {
        this.setState({
          message:
            "Amount for expense " + `${this.props.category}` + " is added",
        });
      })
      .catch((response) => {
        this.setState({ message: response.message });
      });
  }
  render() {
    return (
      <React.Fragment>
        {" "}
        <Modal
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          open={this.state.open}
          trigger={
            <Button basic color="blue">
              {" "}
              Add{" "}
            </Button>
          }
        >
          {" "}
          <Modal.Header color="blue">
            {" "}
            Add Expense for {this.props.category}{" "}
          </Modal.Header>{" "}
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Field inline>
                  <label> Amount </label>{" "}
                  <Input
                    placeholder="Amount"
                    onChange={(event, newValue) =>
                      this.setState({ amount: newValue })
                    }
                  />{" "}
                </Form.Field>{" "}
                <TextArea
                  placeholder="Description"
                  style={{ minHeight: 100 }}
                  onChange={(event, newValue) =>
                    this.setState({ description: newValue })
                  }
                />
              </Form>{" "}
            </Modal.Description>{" "}
          </Modal.Content>{" "}
          <Modal.Actions>
            <Button color="blue" onClick={this.SubmitExpense}>
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
export default AddExpense;
