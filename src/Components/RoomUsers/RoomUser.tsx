import React from "react";
import { User } from "../../propTypes/Models";
import "./RoomUsers.css";

function RoomUser(user: { user: User; score: number }) {
  const avatarString = `https://avatars.dicebear.com/api/adventurer/${user.user.username}.svg`;
  return (
    <div className="user-chip">
      <div className="rank">#1</div>
      <div className="name-points">
        <div className="name">{user.user.username}</div>
        <div className="points">Points : {user.score}</div>
      </div>
      <img src={avatarString} alt="UserPic" />
    </div>
  );
}

export default RoomUser;
