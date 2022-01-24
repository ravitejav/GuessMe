import { User } from "../../propTypes/Models";
import "./UserChip.css";

export interface Remove {
  removeUser: () => void;
}

function UserChip(userProps: { user: User; remove: Function }) {
  const avatarString = `https://avatars.dicebear.com/api/adventurer/${userProps.user.username}.svg`;

  const removeUser = () => {
    userProps.remove(userProps.user.userId);
  };
  return (
    <div className="chip">
      <img src={avatarString} alt="Person" />
      <p className="user-name">{userProps.user.name}</p>
      <span className="closebtn" onClick={removeUser}>
        &times;
      </span>
    </div>
  );
}

export default UserChip;
