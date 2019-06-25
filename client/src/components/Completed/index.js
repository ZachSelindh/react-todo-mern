import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import ToDoItem from "../ToDoItem";

class Completed extends Component {
  constructor() {
    super();
    this.state = {
      pulledTodos: []
    };
  }

  componentDidMount = () => {
    API.getTodos()
      .then(res => this.setState({ pulledTodos: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="display-area-z" className="col-12">
            <h1>Completed Todos:</h1>
            {this.state.pulledTodos.length ? (
              this.state.pulledTodos.map(Todo => {
                return Todo.completed === true ? (
                  <ToDoItem
                    key={Todo._id}
                    title={Todo.title}
                    author={Todo.author}
                    description={Todo.description}
                    completed={Todo.completed}
                  />
                ) : null;
              })
            ) : (
              <h3>No Todos Completed Yet</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Completed;
