import { CREATED_BY_ME_ROOMS, ELIGIBLE_ROOM } from "../../Constants/RoomConstants";
import { GameList } from "../GameList/GameList";
import { NavBar } from "../NavBar";
import "./GameCreation.css";

const GameCreation = () => {


  const handleRoomCreation = () => {

  }

  return (
    <section className="gameCreationContainer">
      <NavBar />
      <div className="createRoomContainer">
        <button className="button" onClick={handleRoomCreation}>Create Room</button>
      </div>
      <div className="availableRooms">
        <div>
          <GameList listType={CREATED_BY_ME_ROOMS} />
        </div>
        <div>
          <GameList listType={ELIGIBLE_ROOM} />
        </div>
      </div>
    </section>
  );
};

export default GameCreation;
