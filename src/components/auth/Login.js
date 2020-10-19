import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import validationLogin from "../../validation/validationLogin";
import Spinner from "../layout/Spinner";
import ErrorMessage from "../layout/ErrorMessage";
import ButtonPrimary from "../layout/ButtonPrimary";
import ButtonDisabled from "../layout/ButtonDisabled";
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
                  {loading ? <Spinner /> : null}
                  {isError ? <ErrorMessage error={error} /> : null}
                  {isError ? (
                    <ButtonDisabled>Log in</ButtonDisabled>
                  ) : (
                    <ButtonPrimary>Log in</ButtonPrimary>
                  )}
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
