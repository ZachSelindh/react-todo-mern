import React, { Component } from "react";
import API from "../../utils/API";
import CreateBar from "../CreateBar";
import ToDoItem from "../ToDoItem";
import "./style.css";

class ToDoPage extends Component {
  constructor() {
    super();
    this.state = {
      pulledTodos: []
    };
  }

  calltodb = () => {
    API.getNotCompletedTodos(localStorage.getItem("token"))
      .then(res => this.setState({ pulledTodos: res.data }))
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.calltodb();
  };

  render() {
    return (
      <div id="display-area-z" className="col-8">
        {/* Passing function as prop in order to refresh call after todo is submitted. */}
        <CreateBar calltodb={this.calltodb} />
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
