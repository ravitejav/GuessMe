import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import {
  AUTHORIZE_USER,
  HTTP_METHODS,
  REGISTER_USER,
  GET_USERNAME,
} from "../../Api/ApiConstants";
import { makeRequest } from "../../Api/fetchCaller";
import { extractFormData } from "../../Api/FormHelper";
import { jwtToken, toasterDetails, loggedInUserState } from "../../Recoil";
import { Auth } from "../Auth";
import { NavBar } from "../NavBar";
import "./homePage.css";

const HomePage = () => {
  const [loginState, setLoginState] = useState(true);
  const [, setJwtToken] = useRecoilState(jwtToken);
  const [, setToaster] = useRecoilState(toasterDetails);
  const [, setLoggedUser] = useRecoilState(loggedInUserState);
  const navigation = useNavigate();
  const [isUserValid, setUserValid] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const results = await makeRequest(
      AUTHORIZE_USER,
      HTTP_METHODS.POST,
      "",
      extractFormData(e.target as HTMLFormElement)
    );
    if (results) {
      setJwtToken(results.jwt);
      setLoggedUser({
        userId: results.user?.userId,
        name: results.user?.name,
        username: results.user?.username,
        password: "",
        emailId: results.user?.emailId,
      });
    }
    e.target.reset();
    navigation("/guessMe/game");
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    if (!isUserValid) {
      setToaster({
        message: "Please correct the details",
        show: true,
        type: "WARN",
      });
      return;
    }
    await makeRequest(
      REGISTER_USER,
      HTTP_METHODS.POST,
      "",
      extractFormData(e.target as HTMLFormElement)
    );
    changeOp();
    setToaster({
      message: "Successfully registered. Please login to continue",
      show: true,
      type: "success",
    });
    e.target.reset();
  };

  const changeOp = () => {
    setLoginState((currentStatus) => !currentStatus);
  };

  const verifyUSN = async (usn: string) => {
    const result = await makeRequest(GET_USERNAME + usn, HTTP_METHODS.GET, "");

    if (result.username) {
      setToaster({
        message: usn + " is not available",
        show: true,
        type: "WARN",
      });
      setUserValid(false);
    } else setUserValid(true);
  };

  return (
    <div className="homePageContainer">
      <NavBar />
      <section className={`AuthContainer center`}>
        <div className={`loginContainer ${!loginState && "hide tilt"}`}>
          <Auth
            type="LOGIN"
            onSubmit={handleLogin}
            changeOp={changeOp}
            verifyUserName={() => {}}
          />
        </div>
        <div className={`registerContainer  ${loginState && "hide tilt"}`}>
          <Auth
            type="REGISTER"
            onSubmit={handleSignUp}
            changeOp={changeOp}
            verifyUserName={verifyUSN}
          />
        </div>
      </section>
    </div>
  );
};
export default HomePage;
