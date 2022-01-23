import { useState } from "react";
import { User } from "../../propTypes/Models";
import UserChip from "../UserChip/UserChip";
import "./Popup.css";
import { makeRequest } from "../../Api/fetchCaller";
import { GET_USERNAME, HTTP_METHODS } from "../../Api/ApiConstants";
import { useRecoilState } from "recoil";
import { jwtToken, toasterDetails } from "../../Recoil";
interface Toggler {
  toggleFunc: () => void;
}

export const Popup = (toggle: Toggler) => {
  const [userList, setUserList] = useState([] as Array<User>);
  const [jwt] = useRecoilState(jwtToken);
  const [, setToaster] = useRecoilState(toasterDetails);

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
    if (results?.userName) {
      const user: User = {
        userId: results.id,
        ...results,
      };
      setUserList([...userList, user]);
    }
  };

  const removeUser = async (userId: number) =>
    setUserList(userList.filter((user) => user.userId !== userId));

  return (
    <div className="modal">
      <div className="overlay" onClick={toggle.toggleFunc}></div>
      <div className="modal-content">
        <h2>Create Room</h2>
        <div className="RoomForm">
          <form onSubmit={() => {}}>
            <input type="text" placeholder="Room Name..." name="roomname" />
            <input
              type="text"
              placeholder="Search Users..."
              name="users"
              onBlur={(e) => {
                searchUserName(e.target.value);
                e.target.value = "";
              }}
            />
            <div className="user-chips">
              {userList.length >= 0 &&
                userList.map((userp: User) => (
                  <UserChip remove={removeUser} user={userp} />
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
