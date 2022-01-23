import { useParams } from "react-router-dom";
import { DrawingBoard } from "../DrawingBoard";
import { NavBar } from "../NavBar";

import "./GameRoom.css";

export const GameRoom = () => {

    const roomId = useParams().roomId;

    return (
        <section className="gameRoomContainer">
            <NavBar />
            <div className="gameBoard">
                <div className="userList">
                    UserList
                </div>
                <div className="drawingBoard">
                    <DrawingBoard roomId={roomId as string} />
                </div>
                <div className="message">
                    Messages
                </div>
            </div>
        </section>
    );
}