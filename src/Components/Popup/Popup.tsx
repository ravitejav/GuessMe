import { useState } from "react";
import { User } from "../../propTypes/Models";
import UserChip from "../UserChip/UserChip";
import "./Popup.css";
import { makeRequest } from "../../Api/fetchCaller";
import {
  CREATE_ROOM,
  GET_USERNAME,
  HTTP_METHODS,
} from "../../Api/ApiConstants";
import { useRecoilState } from "recoil";
import { jwtToken, loggedInUserState, toasterDetails } from "../../Recoil";
import { createRoomType } from "../../propTypes/RoomType";

interface Toggler {
  toggleFunc: () => void;
}

export const Popup = (toggle: Toggler) => {
  const [userList, setUserList] = useState([] as Array<User>);
  const [jwt] = useRecoilState(jwtToken);
  const [, setToaster] = useRecoilState(toasterDetails);
  const [loggedInUser] = useRecoilState(loggedInUserState);

  const searchUserName = async (text: string) => {
    const results: any = await makeRequest(
      GET_USERNAME + text,
      HTTP_METHODS.GET,
      jwt || ""
    );

    if (results?.userName == null) {
      setToaster({
        message: "User not available",
        show: true,
        type: "ERROR",
      });
      return;
    }

    const user: User = {
      userId: results.id,
      ...results,
    };
    setUserList([...userList, user]);
  };

  const removeUser = async (userId: number) =>
    setUserList(userList.filter((user) => user.userId !== userId));

  const roomCreateHandler = async (
    e: React.FormEvent<HTMLFormElement> | any
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let requests: createRoomType = {
      roomname: formData.get("roomname")?.toString()!,
      users: userList.map((user) => ({ userId: user.userId })),
      createdBy: { userId: formData.get("createdBy") },
    };

    const response = await makeRequest(
      CREATE_ROOM,
      HTTP_METHODS.POST,
      jwt || "",
      requests
    );

    //VALIDATION TO BE DONE!!!! when room is not created!!!
    setToaster({
      message: `"${requests.roomname}" has been created`,
      show: true,
      type: "SUCCESS",
    });
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={toggle.toggleFunc}></div>
      <div className="modal-content">
        <h2>Create Room</h2>
        <div className="RoomForm">
          <form onSubmit={roomCreateHandler}>
            <input type="text" placeholder="Room Name..." name="roomname" />
            <input
              type="hidden"
              id="createdBy"
              name="createdBy"
              value={loggedInUser.userId || ""}
            />
            <input
              type="text"
              placeholder="Search Users..."
              name="users"
              onBlur={(e) => {
                e.target.value !== "" && searchUserName(e.target.value); //call only if there is a non-empty value
                e.target.value = "";
              }}
            />
            <div className="user-chips">
              {userList.length >= 0 &&
                userList.map((userp: User) => (
                  <UserChip
                    key={userp.userId}
                    remove={removeUser}
                    user={userp}
                  />
                ))}
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
