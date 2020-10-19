import React, { useState, useContext } from "react";
import Modal from "./Modal";
import validationChangeUsername from "../../validation/validationChangeUsername";
import UserContext from "../../context/UserContext";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import ButtonPrimary from "./ButtonPrimary";
import ButtonDisabled from "./ButtonDisabled";

const ChangeUsername = () => {
  const { userData } = useContext(UserContext);
  const [changeUsername, setChangeUsername] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);

  const validation = () => {
    setIsError(false);
    try {
      validationChangeUsername(changeUsername);
    } catch (e) {
      setIsError(true);
      setError(e.message);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:3000/users/changeUsername", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        changeUsername,
        id: userData.user.id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.error) {
          setError(response.error);
          setIsError(true);
        } else {
          setIsError(false);
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
        setIsError(true);
      });
  };
  return (
    <Modal>
      <form className="change-username" onSubmit={submit}>
        <h2>Change username</h2>
        <label>New Username</label>
        <input
          type="text"
          value={changeUsername}
          name="username"
          id="changeusername"
          onKeyUp={() => validation()}
          onChange={(e) => {
            validation();
            setChangeUsername(e.target.value);
          }}
        />
        {loading ? <Spinner /> : null}
        {isError ? <ErrorMessage error={error} /> : null}
        {isError ? (
          <ButtonDisabled>Change username</ButtonDisabled>
        ) : (
          <ButtonPrimary>Change username</ButtonPrimary>
        )}
      </form>
    </Modal>
  );
};

export default ChangeUsername;
