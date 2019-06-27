import React, { Component } from "react";
import "./style.css";

class CreatePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="display-area-z" className="col-12">
            <h1>Enter your Todo:</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePage;
