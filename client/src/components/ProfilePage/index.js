import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      photoURL: "",
      email: ""
    };
  }

  componentWillMount = () => {
    API.getUserProfile(
      this.props.location.state.props.userID,
      localStorage.getItem("token")
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="display-area-z" className="col-8">
        <h1> Profile Page </h1>
      </div>
    );
  }
}

export default ProfilePage;
