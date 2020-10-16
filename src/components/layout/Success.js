import React from "react";
import { useHistory } from "react-router-dom";

const Success = () => {
  const history = useHistory();
  const handleClick = (e) => {
    history.push("/");
  };
  return (
    <div className="success">
      <h1>Congratulations!</h1>
      <h2>Check your email</h2>
      <button className="button button-primary" onClick={handleClick}>
        Go home
      </button>
    </div>
  );
};

export default Success;
