import { useState } from "react";
import "./GameCreation.css";
import "../Modal/Modal.css";

const GameCreation = () => {
  const [togglePopup, setTogglePopup] = useState(false);

  const toggleModal = () => {
    setTogglePopup(!togglePopup);
  };
  return (
    <div className="btn-container">
      <button className="btn-overlay" onClick={toggleModal}>
        Create Room
      </button>

      {/* CREATE ROOM POPUP */}
      {togglePopup && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
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
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCreation;
