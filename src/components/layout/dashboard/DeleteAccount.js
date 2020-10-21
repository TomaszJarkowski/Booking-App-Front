import React, { useState } from "react";
import Modal from "../Modal";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import ButtonDisabled from "../buttons/ButtonDisabled";
import ButtonDanger from "../buttons/ButtonDanger";
const DeleteAccount = (props) => {
  const [confirmation, setConfirmation] = useState("");
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const text = "agree";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let token = localStorage.getItem("auth-token");
    fetch("https://booking-app-back.herokuapp.com/users/deleteUser", {
      method: "DELETE",
      headers: { "x-auth-token": token },
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.error) {
          isError(true);
          setError(response.error);
        } else {
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
        isError(true);
        setError(e.message);
      });
  };

  const validation = () => {
    if (confirmation === text) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <Modal>
      <form onSubmit={submit} className="delete-account modal-form">
        <h2>Are you absolutely sure?</h2>
        <h3>
          This action cannot be undone. This will permanently delete the
          profile, booking, history.
        </h3>
        <label>
          Please type <strong>{text}</strong> to confirm.
        </label>
        <input
          type="text"
          value={confirmation}
          onKeyUp={() => validation()}
          onKeyDown={() => validation()}
          onChange={(e) => {
            validation();
            setConfirmation(e.target.value);
          }}
        />
        {loading ? <Spinner /> : null}
        {isError ? <ErrorMessage error={error} /> : null}
        {isError ? (
          <ButtonDisabled>delete</ButtonDisabled>
        ) : (
          <ButtonDanger>delete </ButtonDanger>
        )}
      </form>
    </Modal>
  );
};

export default DeleteAccount;
