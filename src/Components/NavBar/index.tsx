import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { jwtToken } from "../../Recoil";
import "./Navbar.css";
import { faPencilRuler, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {

    const [jwttoken, setJwtToken] = useRecoilState(jwtToken)

    return (
        <div className="navBarContainer">
            <ul className="navbar">
                <li className="navItem heading">Guess Me <FontAwesomeIcon icon={faPencilRuler} /> </li>
                {jwttoken && (<li className="navItem signOut button" onClick={() => setJwtToken(null)}><FontAwesomeIcon icon={faSignOutAlt} /> SignOut</li>)}
            </ul>
        </div>
    );

}