import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { jwtToken, loggedInUserState } from "../../Recoil";
import "./Navbar.css";
import { faPencilRuler, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { USER_DEFAULT_VALUE } from "../../Constants/RecoilConstants";

export const NavBar = () => {
  const [jwttoken, setJwtToken] = useRecoilState(jwtToken);
  const [, setLoggedInUser] = useRecoilState(loggedInUserState);

  const signOutFunc = () => {
    setJwtToken(null);
    setLoggedInUser(USER_DEFAULT_VALUE);
  };

  return (
    <div className="navBarContainer">
      <ul className="navbar">
        <li className="navItem heading">
          Guess Me <FontAwesomeIcon icon={faPencilRuler} />{" "}
        </li>
        {jwttoken && (
          <li className="navItem signOut button" onClick={signOutFunc}>
            <FontAwesomeIcon icon={faSignOutAlt} /> SignOut
          </li>
        )}
      </ul>
    </div>
  );
};
