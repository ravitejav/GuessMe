import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { jwtToken } from "../../Recoil";
import "./Navbar.css";
import { faPencilRuler } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {

    const [jwttoken,] = useRecoilState(jwtToken)

    return (
        <div className="navBarContainer">
            <ul className="navbar">
                <li className="navItem heading">Guess Me <FontAwesomeIcon icon={faPencilRuler} /> </li>
                {jwttoken && (<li className="navItem signOut"></li>)}
            </ul>
        </div>
    );

}