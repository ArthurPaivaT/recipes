import React, { Component } from "react";
import "./UserCard.css";

import axios from "axios";

class UserCard extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:1212/getuser").then((res) => {
      const user = res.data;
      console.log(res.data);
      this.setState({ user });
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="userCardDiv">
        <div className="cardBar">
          <h1 className="userName"> {this.state.user.name} </h1>
        </div>
        <div className="cardBody">
          <div className="cardInfo">Main Role: {this.state.user.mainRole}</div>
          <div className="cardInfo">Github: {this.state.user.gitHub}</div>
          <div className="cardInfo">LinkedIn: {this.state.user.linkedIn}</div>
        </div>
      </div>
    );
  }
}

export default UserCard;
