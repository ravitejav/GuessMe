import { useEffect, useState } from "react";
import { User } from "../../propTypes/Models";
import { RoomUserProps } from "../../propTypes/RoomUserProps";
import "./RoomUsers.css";

import RoomUser from "./RoomUser";
import { SUBMIT_USER_UPDATES } from "../../Api/ApiConstants";

function RoomUsers(roomUserProps: RoomUserProps) {
  const [roomUserList, setRoomUserList] = useState([] as Array<User>);
  const [scores, setScores] = useState({} as any);

  const updateUserList = (user: string) => {
    const newMsgs: any = JSON.parse(user);

    if (newMsgs?.type === "SCORE_UPDATE") {
      setScores((values: any) => ({
        ...values,
        [newMsgs.user.userId]:
          (values[newMsgs.user.userId] || 0) + newMsgs.user.score,
      }));
      return;
    }

    setRoomUserList((users) => {
      const currUserIds = new Set();
      users.forEach((user) => currUserIds.add(user.userId));
      let interLen = 0;
      newMsgs.forEach((user: User) => {
        if (currUserIds.has(user.userId)) interLen++;
      });
      if (interLen !== newMsgs.length) {
        const updatedArr = [...users, ...newMsgs];
        const uniqueArr: Array<User> = [];
        currUserIds.clear();
        updatedArr.forEach((user) => {
          if (!currUserIds.has(user.userId)) {
            uniqueArr.push(user);
            currUserIds.add(user.userId);
          }
        });
        return uniqueArr;
      }
      return users;
    });
  };

  useEffect(() => {
    roomUserProps.currentConnection &&
      roomUserProps.currentConnection.send(
        SUBMIT_USER_UPDATES(roomUserProps.roomId),
        {},
        JSON.stringify(roomUserList)
      );
  }, [roomUserList]);

  roomUserProps.getNewUser(updateUserList);

  return (
    <>
      {roomUserList.map((user: User, i) => (
        <RoomUser
          score={(scores[user.userId] || 0) as number}
          user={user}
          key={i}
        />
      ))}
    </>
  );
}

export default RoomUsers;
