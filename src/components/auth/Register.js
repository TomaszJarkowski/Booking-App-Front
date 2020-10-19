import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import validationRegister from "../../validation/validationRegister";
import Spinner from "../layout/Spinner";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const register = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
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
            {!isError ? (
              <button className="button button-primary">Register</button>
            ) : (
              <button className="button button-disabled">Register</button>
            )}
            {loading ? <Spinner /> : null}
            {isError ? <p className="error-message">{error}</p> : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
