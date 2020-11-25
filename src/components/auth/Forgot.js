import React, { useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Spinner from "../layout/Spinner";
import ErrorMessage from "../layout/ErrorMessage";
import ButtonPrimary from "../layout/buttons/ButtonPrimary";
import ButtonDisabled from "../layout/buttons/ButtonDisabled";
import CheckMail from "./CheckMail";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSend, setIsSend] = useState(false);

  const { userData } = useContext(UserContext);

  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const validation = () => {
    setIsError(false);

    if (!email || !email.match(mailformat)) {
      setError("Email is not correct");
      setIsError(true);
    }
  };

  const postForgotPassword = async (email) => {
    setLoading(true);
    setIsSend(false);
    try {
      const forgot = await fetch(
        "https://booking-app-back.herokuapp.com/users/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const forgotResponse = await forgot.json();
      setLoading(false);
      if (forgotResponse.error) {
        setError(forgotResponse.error);
        setIsError(true);
      } else {
        setIsSend(true);
      }
    } catch (e) {
      setLoading(false);
      setError("Failed to fetch");
      setIsError(true);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (email && email.match(mailformat)) {
      await postForgotPassword(email);
    }
  };

  return (
    <Route
      render={() =>
        !userData.user ? (
          <>
            <div className="page page-form">
              <div className="form">
                {isSend ? (
                  <CheckMail />
                ) : (
                  <>
                    <h2>Forgot your password?</h2>
                    <form onSubmit={submit}>
                      <label htmlFor="forgot-email">
                        Email Address <span className="star">*</span>
                      </label>
                      <input
                        id="forgot-email"
                        type="email"
                        onKeyUp={validation}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          validation();
                        }}
                      />
                      {loading ? <Spinner /> : null}
                      {isError ? <ErrorMessage error={error} /> : null}
                      {isError ? (
                        <ButtonDisabled>Reset Password</ButtonDisabled>
                      ) : (
                        <ButtonPrimary>Reset Password</ButtonPrimary>
                      )}
                    </form>
                  </>
                )}
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

export default Forgot;
