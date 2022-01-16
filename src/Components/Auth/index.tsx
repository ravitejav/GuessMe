import { AuthProps } from "../../propTypes/AuthType";
import "./Auth.css";

export const Auth = (authProps: AuthProps) => {
  return (
    <div className="AuthForm">
      <form onSubmit={authProps.onSubmit}>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        {authProps.type === "REGISTER" && <input type="text" placeholder="Name" name="name" />}
        {authProps.type === "REGISTER" && <input type="email" placeholder="Email" name="email" />}
        <button type="submit">{authProps.type}</button>
      </form>
      <div className="changeOperation">
           {authProps.type === "REGISTER" ? 'I ' : 'I don\'t'} have account? 
           <span onClick={authProps.changeOp}>{authProps.type === "REGISTER" ? ' Login' : ' Register'}</span>
      </div>
    </div>
  );
};
