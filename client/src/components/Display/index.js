import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import ToDoItem from "../ToDoItem";

class Display extends Component {
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
            {this.state.pulledTodos.length ? (
              this.state.pulledTodos.map(Todo => {
                return (
                  <ToDoItem
                    key={Todo._id}
                    title={Todo.title}
                    author={Todo.author}
                    description={Todo.description}
                  />
                );
              })
            ) : (
              <h3>No Results</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
