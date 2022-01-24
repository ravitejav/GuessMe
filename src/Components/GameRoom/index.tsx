import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Client, Message } from "stompjs";
import { stompConnection } from "../../Api/WebSocketConnection";
import { loggedInUserState } from "../../Recoil";
import { DrawingBoard } from "../DrawingBoard";
import { NavBar } from "../NavBar";

import "./GameRoom.css";

export const GameRoom = () => {

    const roomId = useParams().roomId;
    const [currentConnection, setConnection] = useState(null as unknown as Client);
    const [user] = useRecoilState(loggedInUserState);

    
    let drawingRef = useRef(null);

    const handleImageUpdates = (updates: Message) => {
        if (user.userId === 1) return;
        const paths = JSON.parse(updates.body).updatedPaths;
        (drawingRef as any).loadPaths(paths);
    };

    useEffect(() => {
        const logger = (msg: string) => console.log(msg);
        stompConnection(roomId, handleImageUpdates, logger, logger, (val) => setConnection(val));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [roomId]);

    return (
        <section className="gameRoomContainer">
            <NavBar />
            <div className="gameBoard">
                <div className="userList">
                    UserList
                </div>
                <div className="drawingBoard">
                    <DrawingBoard passDrawingRef={canvasRef => drawingRef = canvasRef}  currentConnection={currentConnection} roomId={roomId as string} />
                </div>
                <div className="message">
                    Messages
                </div>
            </div>
        </section>
    );
}