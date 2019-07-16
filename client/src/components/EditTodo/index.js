import React, { Component } from "react";
import Header from "../Header";
import "./style.css";

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.location.state.props._id,
      title: this.props.location.state.props.title,
      description: this.props.location.state.props.description
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div id="display-area-z" className="col-8">
            <div>
              <h1>Edit your Todo:</h1>
              <form
                className="todo-form"
                autoComplete="off"
                onSubmit={this.handleSubmit}
                /* action="/api/todos" */
                method="PUT"
              >
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTodo;
