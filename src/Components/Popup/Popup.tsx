import React from "react";
import "./Popup.css";

interface Toggler {
  toggleFunc: () => void;
}

export const Popup = (toggle: Toggler) => {
  return (
    <div className="modal">
      <div className="overlay" onClick={toggle.toggleFunc}></div>
      <div className="modal-content">
        <h2>Create Room</h2>
        <div className="RoomForm">
          <form onSubmit={() => {}}>
            <input type="text" placeholder="Room Name..." name="roomname" />
            <input type="text" placeholder="Search Users..." name="users" />
            <div className="users">
              <p>Adding Users here...</p>
            </div>
            <button type="submit">Create Room</button>
          </form>
        </div>
        <button className="close-modal" onClick={toggle.toggleFunc}>
          &times;
        </button>
      </div>
    </div>
  );
};
