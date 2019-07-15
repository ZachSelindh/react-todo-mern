import React, { Component } from "react";
import Header from "../Header";
import API from "../../utils/API";
import CreateBar from "../CreateBar";
import ToDoItem from "../ToDoItem";
import history from "../../utils/history";
import "./style.css";

class ToDoPage extends Component {
  constructor() {
    super();
    this.state = {
      pulledTodos: []
    };
  }

  calltodbNotCompleted = () => {
    API.getNotCompletedTodos(localStorage.getItem("token"))
      .then(res => this.setState({ pulledTodos: res.data }))
      .catch(err => {
        console.log(err.response.status);
      });
  };

  componentDidMount = () => {
    API.checkToken(localStorage.getItem("token"))
      .then(res => {
        console.log(res.data.message);
        this.calltodbNotCompleted();
      })
      .catch(err => {
        if (err.response.status === 403) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div id="display-area-z" className="col-8">
            {/* Passing function as prop in order to refresh call after todo is submitted. */}
            <CreateBar calltodbNotCompleted={this.calltodbNotCompleted} />
            <h1>Todo List:</h1>
            {this.state.pulledTodos.length ? (
              this.state.pulledTodos.map(Todo => {
                return (
                  <ToDoItem
                    key={Todo._id}
                    todoID={Todo._id}
                    title={Todo.title}
                    author={Todo.author}
                    description={Todo.description}
                    completed={Todo.completed}
                    calltodbNotCompleted={this.calltodbNotCompleted}
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

export default ToDoPage;
