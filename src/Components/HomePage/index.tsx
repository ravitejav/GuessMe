import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { AUTHORIZE_USER, HTTP_METHODS, REGISTER_USER } from '../../Api/ApiConstants';
import { makeRequest } from '../../Api/fetchCaller';
import { extractFormData } from '../../Api/FormHelper';
import { jwtToken, toasterDetails } from '../../Recoil';
import { Auth } from '../Auth';
import { NavBar } from '../NavBar';
import './homePage.css';

const HomePage = () => {

  const [loginState, setLoginState] = useState(true);
  const [, setJwtToken] = useRecoilState(jwtToken);
  const [, setToaster] = useRecoilState(toasterDetails);
  const navigation = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const results = await makeRequest(AUTHORIZE_USER, HTTP_METHODS.POST, '', extractFormData(e.target as HTMLFormElement));
    setJwtToken(results.jwt);
    e.target.reset();
    navigation('/guessMe/game');
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    await makeRequest(REGISTER_USER, HTTP_METHODS.POST, '', extractFormData(e.target as HTMLFormElement));
    changeOp();
    setToaster({
      message: "Successfully registered. Please login to continue",
      show: true,
      type: 'success'
    })
    e.target.reset();
  }

  const changeOp = () => {
    setLoginState(currentStatus => !currentStatus);
  }


  return (
    <div className="homePageContainer">
        <NavBar />
        <section className={`AuthContainer center`}>
          <div className={`loginContainer ${!loginState && "hide tilt"}`}>
            <Auth type='LOGIN' onSubmit={handleLogin} changeOp={changeOp} />
          </div>
          <div className={`registerContainer  ${loginState && "hide tilt"}`}>
            <Auth type='REGISTER' onSubmit={handleSignUp} changeOp={changeOp} />
          </div>
        </section>
    </div>  
  );
};
export default HomePage;
