import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import validationLogin from "../../validation/validationLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const validation = () => {
    setIsError(false);
    try {
      validationLogin(email, password);
    } catch (e) {
      setError(e.message);
      setIsError(true);
    }
  };

  const postLogin = async (user) => {
    setLoading(true);
    try {
      const login = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const loginResponse = await login.json();
      setLoading(false);
      if (loginResponse.error) {
        setError(loginResponse.error);
        setIsError(true);
      } else {
        setUserData({
          token: loginResponse.token,
          user: loginResponse.user,
        });
        localStorage.setItem("auth-token", loginResponse.token);
        history.push("/booking");
      }
    } catch (e) {
      setLoading(false);
      setError("Failed to fetch");
      setIsError(true);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    if (!isError && email && password) {
      await postLogin(user);
    }
  };

  return (
    <Route
      render={() =>
        !userData.user ? (
          <>
            <div className="page page-form">
              <div className="form">
                <h2>Login</h2>
                <form onSubmit={submit}>
                  <label htmlFor="login-email">Email</label>
                  <input
                    type="email"
                    id="login-email"
                    onKeyUp={validation}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validation();
                    }}
                  />
                  <label htmlFor="login-password">Password</label>
                  <input
                    type="password"
                    id="login-password"
                    onKeyUp={validation}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validation();
                    }}
                  />
                  {!isError ? (
                    <button className="button button-primary">Log in</button>
                  ) : (
                    <button className="button button-disabled">Log in</button>
                  )}
                  {loading ? <p>Loading</p> : null}
                  {isError ? <p className="error-message">{error}</p> : null}
                </form>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default Login;
