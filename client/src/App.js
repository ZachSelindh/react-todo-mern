import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import TodoPage from "./components/ToDoPage";
import Completed from "./components/Completed";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import history from "../src/utils/history";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Router history={history}>
          <div className="container">
            <div className="row">
              <Route exact path="/" component={TodoPage} />
              <Route exact path="/completed" component={Completed} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/registration" component={RegisterPage} />
              <Route exact path="/profile/:id" component={ProfilePage} />
            </div>
          </div>
        </Router>
      </Wrapper>
    );
  }
}

export default App;
