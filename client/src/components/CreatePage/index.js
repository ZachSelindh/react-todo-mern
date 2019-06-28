import React, { Component } from "react";
import "./style.css";

class CreatePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="display-area-z" className="col-12">
            <h1>Enter your Todo:</h1>
            <form action="/api/todos" method="POST">
              <input type="text" placeholder="Title" name="title" />
              <input type="text" placeholder="description" name="description" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePage;
