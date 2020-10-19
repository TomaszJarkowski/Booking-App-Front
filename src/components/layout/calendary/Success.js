import React from "react";
import { useHistory } from "react-router-dom";
import ButtonPrimary from "../buttons/ButtonPrimary";
const Success = () => {
  const history = useHistory();

  const handleClick = (e) => {
    history.push("/");
  };

  return (
    <div className="success">
      <h1>Congratulations!</h1>
      <h2>You managed to book a table!</h2>
      <ButtonPrimary onClick={handleClick}>Go home</ButtonPrimary>
    </div>
  );
};

export default Success;
