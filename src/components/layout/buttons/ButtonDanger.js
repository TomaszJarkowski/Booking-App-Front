import React from "react";

const ButtonDanger = ({ children, onClick }) => {
  return (
    <button className="button button-danger" type="submit" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonDanger;
