import React, { useState, useContext } from "react";
import Modal from "../Modal";
import UserContext from "../../../context/UserContext";
import validationChangePassword from "../../../validation/validationChangePassword";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonDisabled from "../buttons/ButtonDisabled";
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

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://booking-app-back.herokuapp.com/users/changePassword", {
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
          localStorage.clear();
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
      <form className="change-username modal-form" onSubmit={submit}>
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
        {isError ? <ErrorMessage error={error} /> : null}
        {isError ? (
          <ButtonDisabled>Change username</ButtonDisabled>
        ) : (
          <ButtonPrimary>Change password</ButtonPrimary>
        )}
      </form>
    </Modal>
  );
};

export default ChangePassword;
