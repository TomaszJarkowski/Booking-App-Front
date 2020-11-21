import React from "react";
import { useHistory } from "react-router-dom";

const CheckMail = () => {
  const history = useHistory();
  const login = () => history.push("/login");

  return (
    <div className="checkMail">
      <h3>Check your email</h3>
      <p>
        You got a new password on your mail. Please change your password as soon
        as possible after logging in
      </p>
      <button onClick={login} className="button-secondary button-login">
        Log in
      </button>
    </div>
  );
};

export default CheckMail;
