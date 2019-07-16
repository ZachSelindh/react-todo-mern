import React, { Component } from "react";
import Header from "../Header";
import "./style.css";
import API from "../../utils/API";

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

  handleSubmit = event => {
    event.preventDefault();
    API.updateTodo(
      this.state.id,
      {
        title: this.state.title,
        description: this.state.description
      },
      localStorage.getItem("token")
    )
      /* .then(res => console.log(res.config.data)) */
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
                /*  action={`/api/todos/todo/update/${this.state.id}`} */
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
