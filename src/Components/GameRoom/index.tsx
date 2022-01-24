import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Client, Message } from "stompjs";
import { stompConnection } from "../../Api/WebSocketConnection";
import { loggedInUserState } from "../../Recoil";
import { DrawingBoard } from "../DrawingBoard";
import { Messages } from "../Messages/Messages";
import { NavBar } from "../NavBar";

import "./GameRoom.css";

export const GameRoom = () => {
  const roomId = useParams().roomId;
  const [currentConnection, setConnection] = useState(
    null as unknown as Client
  );
  const [currentWord, ] = useState("demo");
  const [user] = useRecoilState(loggedInUserState);

  let onMessage = (message: string) => {};

  let drawingRef = useRef(null);

  const handleImageUpdates = (updates: Message) => {
    if (user.userId === 1) return;
    const paths = JSON.parse(updates.body).updatedPaths;
    (drawingRef as any).loadPaths(paths);
  };

  const handleMessageUpdates = (updates: Message) => {
    onMessage(updates.body);
  };

  useEffect(() => {
    const logger = (msg: string) => console.log(msg);
    stompConnection(roomId, handleImageUpdates, handleMessageUpdates, logger, (val) =>
      setConnection(val)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <section className="gameRoomContainer">
      <NavBar />
      <div className="gameBoard">
        <div className="userList">UserList</div>
        <div className="drawingBoard">
          <DrawingBoard
            passDrawingRef={(canvasRef) => (drawingRef = canvasRef)}
            currentConnection={currentConnection}
            roomId={roomId as string}
          />
        </div>
        <div className="message">
          <Messages
            currentWord={currentWord}
            getSyncMessage={(messgaeHandler: any) =>
              (onMessage = messgaeHandler)
            }
            stompConnection={currentConnection}
            roomId={roomId as string}
          />
        </div>
      </div>
    </section>
  );
};
