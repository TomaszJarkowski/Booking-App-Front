import React, { useState, useContext } from "react";
import Modal from "./Modal";
import UserContext from "../../context/UserContext";
import validationChangePassword from "../../validation/validationChangePassword";
import Spinner from "./Spinner";

const ChangePassword = () => {
  const { userData } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validation = () => {
    setIsError(false);
    try {
      validationChangePassword(oldPassword, newPassword, confirmNewPassword);
    } catch (e) {
      setIsError(true);
      setError(e.message);
    }
  };

  const submit = () => {
    setLoading(true);
    fetch("http://localhost:3000/users/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
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
      <from className="change-username">
        <h2>Change password</h2>
        <label>Old password</label>
        <input
          type="password"
          onKeyUp={validation}
          onChange={(e) => {
            validation();
            setOldPassword(e.target.value);
          }}
        />
        <label>New password</label>
        <input
          type="password"
          onKeyUp={validation}
          onChange={(e) => {
            validation();
            setNewPassword(e.target.value);
          }}
        />
        <label>Confirm new password</label>
        <input
          type="password"
          onKeyUp={validation}
          onChange={(e) => {
            validation();
            setConfirmNewPassword(e.target.value);
          }}
        />
        {loading ? <Spinner /> : null}
        {isError ? <p className="error-message">{error}</p> : null}
        {isError ? (
          <button className="button button-disabled">Change username</button>
        ) : (
          <button
            type="submit"
            onClick={submit}
            className="button button-primary"
          >
            Change password
          </button>
        )}
      </from>
    </Modal>
  );
};

export default ChangePassword;
