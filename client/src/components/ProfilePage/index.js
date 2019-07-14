import React, { Component } from "react";
import Header from "../Header";
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
    API.checkToken(localStorage.getItem("token"))
      .then(res => {
        console.log(res.data.message);
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

  componentDidMount = () => {
    API.getUser(
      this.props.location.pathname.replace("/profile/", ""),
      localStorage.getItem("token")
    )
      .then(res =>
        this.setState({
          username: res.data.username,
          photoURL: res.data.photoURL,
          email: res.data.email
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
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
        </div>
      </div>
    );
  }
}

export default ProfilePage;
