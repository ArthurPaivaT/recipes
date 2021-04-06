import React, { Component } from "react";
import "./UserCard.css";

class UserCard extends Component {
  render() {
    return (
      <div className="userCardDiv">
        <div className="cardBar">
          <h1 className="userName"> Full User Name </h1>
        </div>
        <div className="cardBody">
          <div className="cardInfo">Main Role: User Main Role</div>
          <div className="cardInfo">Github: User Github</div>
          <div className="cardInfo">LinkedIn: User LinkedIn</div>
        </div>
      </div>
    );
  }
}

export default UserCard;
