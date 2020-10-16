import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import userSVG from "../../svg/user.svg";
const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const dashboard = () => history.push("/dashboard");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <div className="auth-options">
      {userData.user ? (
        <>
          <div className="user" onClick={dashboard}>
            <img src={userSVG} alt="" />
            <p>{userData.user.userName}</p>
          </div>
          <button onClick={logout} className="button-logout">
            Log out
          </button>
        </>
      ) : (
        <>
          <button onClick={login} className="button-secondary button-login">
            Log in
          </button>
          <button onClick={register} className="button-primary button-register">
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
