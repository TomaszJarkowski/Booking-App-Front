import React from "react";

const ButtonPrimary = ({ children, onClick }) => {
  return (
    <button className="button button-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
