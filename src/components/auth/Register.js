import React, { useState, useContext } from "react";
import { useHistory, Route, Redirect } from "react-router-dom";
import validationRegister from "../../validation/validationRegister";
import UserContext from "../../context/UserContext";
import Spinner from "../layout/Spinner";
import ErrorMessage from "../layout/ErrorMessage";
import ButtonPrimary from "../layout/buttons/ButtonPrimary";
import ButtonDisabled from "../layout/buttons/ButtonDisabled";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);

  const history = useHistory();

  const validation = () => {
    setIsError(false);
    try {
      validationRegister(email, userName, password, passwordCheck);
    } catch (e) {
      setError(e.message);
      setIsError(true);
    }
  };
  const postRegister = async (newUser) => {
    setLoading(true);
    try {
      const register = await fetch(
        "https://booking-app-back.herokuapp.com/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      const registerResponse = await register.json();
      setLoading(false);
      if (registerResponse.error) {
        setError(registerResponse.error);
        setIsError(true);
      } else {
        history.push("/login");
      }
    } catch (e) {
      setLoading(false);
      setError("Failed to fetch");
      setIsError(true);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, userName, password, passwordCheck };

    if (!isError && email && password && passwordCheck) {
      await postRegister(newUser);
    }
  };

  return (
    <Route
      render={() =>
        !userData.user ? (
          <>
            <div className="page page-form">
              <div className="form">
                <h2>Register</h2>
                <form onSubmit={submit}>
                  <label htmlFor="register-email">
                    Email <span className="star">*</span>
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    onKeyUp={validation}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validation();
                    }}
                  />
                  <label htmlFor="register-display-name">
                    Username <span className="star">*</span>
                  </label>
                  <input
                    id="register-display-name"
                    type="text"
                    onKeyUp={validation}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      validation();
                    }}
                  />

                  <label htmlFor="register-password">
                    Password <span className="star">*</span>
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    onKeyUp={validation}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validation();
                    }}
                  />
                  <label htmlFor="register-password-check">
                    Veryify password <span className="star">*</span>
                  </label>

                  <input
                    id="register-password-check"
                    type="password"
                    onKeyUp={validation}
                    onChange={(e) => {
                      setPasswordCheck(e.target.value);
                      validation();
                    }}
                  />
                  {loading ? <Spinner /> : null}
                  {isError ? <ErrorMessage error={error} /> : null}
                  {isError ? (
                    <ButtonDisabled>Register</ButtonDisabled>
                  ) : (
                    <ButtonPrimary>Register</ButtonPrimary>
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

export default Register;
