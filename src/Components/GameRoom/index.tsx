import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Client, Message } from "stompjs";
import { stompConnection } from "../../Api/WebSocketConnection";
import { loggedInUserState } from "../../Recoil";
import { DrawingBoard } from "../DrawingBoard";
import { Messages } from "../Messages/Messages";
import { NavBar } from "../NavBar";
import RoomUsers from "../RoomUsers/RoomUsers";
import { User } from "../../propTypes/Models";

import "./GameRoom.css";
import { SUBMIT_USER_UPDATES } from "../../Api/ApiConstants";

export const GameRoom = () => {
  const roomId = useParams().roomId;
  const [currentConnection, setConnection] = useState(
    null as unknown as Client
  );
  const [currentWord] = useState("demo");
  const [user] = useRecoilState(loggedInUserState);

  const userObj: User = {
    emailId: user.emailId,
    name: user.name,
    password: user.password,
    userId: user.userId as unknown as number,
    username: user.username,
  };
  let onMessage = (message: string) => {};
  let onNewUser = (message: string) => {};

  let drawingRef = useRef(null);

  const handleImageUpdates = (updates: Message) => {
    if (user.userId === 1) return;
    const paths = JSON.parse(updates.body).updatedPaths;
    (drawingRef as any).loadPaths(paths);
  };

  const handleMessageUpdates = (updates: Message) => {
    onMessage(updates.body);
  };

  const handleUserUpdates = (updates: Message) => {
    onNewUser(updates.body);
  };

  useEffect(() => {
    stompConnection(
      roomId,
      handleImageUpdates,
      handleMessageUpdates,
      handleUserUpdates,
      (val) => {
        setConnection(val);
        val &&
          val.send(
            SUBMIT_USER_UPDATES(roomId as string),
            {},
            JSON.stringify([userObj])
          );
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <section className="gameRoomContainer">
      <NavBar />
      <div className="gameBoard">
        <div className="userList">
          {/* {TO DO!!!!!!!!!!!!!!!!!!} */}
          <div className="room-name">Kishore's Room</div>
          <RoomUsers
            roomId={roomId as string}
            user={userObj}
            getNewUser={(messgaeHandler: any) => (onNewUser = messgaeHandler)}
            currentConnection={currentConnection}
          />
        </div>
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
