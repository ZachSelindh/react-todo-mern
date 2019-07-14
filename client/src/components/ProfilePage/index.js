import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import history from "../../utils/history";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      photoURL: "",
      email: "",
      todos: []
    };
  }

  componentWillMount = () => {
    API.getUser(this.props.location.pathname.replace("/profile/", ""))
      .then(res =>
        this.setState({
          username: res.data.username,
          photoURL: res.data.photoURL,
          email: res.data.email
        })
      )
      .catch(err => console.log(err), history.push("/login"));
  };

  render() {
    return (
      <div id="display-area-z" className="col-8">
        <h1> Profile Page </h1>
        <br />
        <img
          alt={this.state.username}
          src={this.state.photoURL}
          height="300px"
          width="300px"
        />
        <h3>Username:</h3> <p>{this.state.username}</p>
        <h4>Email:</h4> <p>{this.state.email}</p>
      </div>
    );
  }
}

export default ProfilePage;
