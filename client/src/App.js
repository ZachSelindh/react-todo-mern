import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import TodoPage from "./components/ToDoPage";
import Completed from "./components/Completed";
import RegisterPage from "./components/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Router>
          <div className="container">
            <div className="row">
              <div id="display-area-z" className="col-12">
                <Route exact path="/" component={TodoPage} />
                <Route exact path="/completed" component={Completed} />
                <Route exact path="/registration" component={RegisterPage} />
              </div>
            </div>
          </div>
        </Router>
      </Wrapper>
    );
  }
}

export default App;
