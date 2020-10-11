import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    const login = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const logiResponse = await login.json();
    console.log(logiResponse);

    setUserData({
      token: logiResponse.token,
      user: logiResponse.user,
    });

    localStorage.setItem("auth-token", logiResponse.token);
    history.push("/");
  };
  return (
    <>
      <div className="page page-form">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button button-primary">Log in</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
