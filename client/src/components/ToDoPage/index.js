import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import CreateBar from "../CreateBar";
import ToDoItem from "../ToDoItem";
import history from "../../utils/history";

class ToDoPage extends Component {
  constructor() {
    super();
    this.state = {
      pulledTodos: [],
      title: "",
      description: ""
    };
  }

  // Seperated into its own function so it can be passed as prop.
  APIcalltodb = () => {
    this.setState({ pulledTodos: [] });
    API.getNotCompletedTodos(localStorage.getItem("token"))
      .then(res => this.setState({ pulledTodos: res.data }))
      .catch(err => {
        console.log(err);
        history.push("/login");
      });
  };

  componentWillMount = () => {
    this.APIcalltodb();
  };

  render() {
    return (
      <div>
        {/* Passing function as prop in order to refresh call after todo is submitted. */}
        <CreateBar APIcalltodb={this.APIcalltodb} />
        <h1>Todo List:</h1>
        {this.state.pulledTodos.length ? (
          this.state.pulledTodos.map(Todo => {
            return (
              <ToDoItem
                key={Todo._id}
                title={Todo.title}
                author={Todo.author}
                description={Todo.description}
                completed={Todo.completed}
              />
            );
          })
        ) : (
          <h3>No Results</h3>
        )}
      </div>
    );
  }
}

export default ToDoPage;
