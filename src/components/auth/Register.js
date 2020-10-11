import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { setUserData } = useContext(UserContext);

  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, password, passwordCheck, displayName };
    console.log(newUser);

    const register = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const registerResponse = await register.json();

    console.log(registerResponse);

    const login = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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
          <h2>Register</h2>
          <form onSubmit={submit}>
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="register-display-name">Name</label>
            <input
              id="register-display-name"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="register-password-check">Veryify password</label>

            <input
              id="register-password-check"
              type="password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button className="button button-primary">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
