import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import TodoPage from "./components/ToDoPage";
import Completed from "./components/Completed";
import CreatePage from "./components/CreatePage";
import RegisterPage from "./components/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Router>
          <Route exact path="/" component={TodoPage} />
          <Route exact path="/completed" component={Completed} />
          <Route exact path="/create" component={CreatePage} />
          <Route exact path="/registration" component={RegisterPage} />
        </Router>
      </Wrapper>
    );
  }
}

export default App;
