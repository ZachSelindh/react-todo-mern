import React, { Component } from "react";
import Header from "../Header";
import API from "../../utils/API";
import ToDoItem from "../ToDoItem";
import history from "../../utils/history";
import "./style.css";

class Completed extends Component {
  constructor() {
    super();
    this.state = {
      completeTodos: []
    };
  }

  calltodbCompleted = () => {
    API.getCompletedTodos(localStorage.getItem("token"))
      .then(res => this.setState({ completeTodos: res.data }))
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      API.checkToken(localStorage.getItem("token"))
        .then(res => {
          console.log(res.data.message);
          this.calltodbCompleted();
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
    } else {
      history.push("/login");
    }
  };

  render() {
    return (
      <div>
        <Header />

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
      </div>
    );
  }
}

export default Completed;
