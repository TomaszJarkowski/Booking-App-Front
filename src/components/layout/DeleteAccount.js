import React, { useState } from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";

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
    fetch("http://localhost:3000/users/deleteUser", {
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
      <form onSubmit={submit} className="delete-account">
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
        {isError ? <p className="error-message">{error}</p> : null}
        {isError ? (
          <button className="button button-disabled">
            I understand the consequences, delete this account
          </button>
        ) : (
          <button className="button button-danger" type="submit">
            I understand the consequences, delete this account
          </button>
        )}
      </form>
    </Modal>
  );
};

export default DeleteAccount;
