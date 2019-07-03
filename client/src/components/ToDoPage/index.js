import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import CreateBar from "../CreateBar";
import ToDoItem from "../ToDoItem";

class ToDoPage extends Component {
  constructor() {
    super();
    this.state = {
      pulledTodos: [],
      title: "",
      description: ""
    };
  }

  APIcalltodb = () => {
    API.getNotCompletedTodos()
      .then(res => this.setState({ pulledTodos: res.data }))
      .catch(err => console.log(err));
  };

  componentWillMount = () => {
    this.APIcalltodb();
  };

  render() {
    return (
      <div>
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
