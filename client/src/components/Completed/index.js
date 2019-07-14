import React, { Component } from "react";
import API from "../../utils/API";
import ToDoItem from "../ToDoItem";
import "./style.css";

class Completed extends Component {
  constructor() {
    super();
    this.state = {
      completeTodos: []
    };
  }

  componentDidMount = () => {
    API.getCompletedTodos(localStorage.getItem("token"))
      .then(res => this.setState({ completeTodos: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="display-area-z" className="col-8">
        <h1>Completed Todos:</h1>
        {this.state.completeTodos.length ? (
          this.state.completeTodos.map(Todo => {
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
          <h3>No Todos Completed Yet</h3>
        )}
      </div>
    );
  }
}

export default Completed;
