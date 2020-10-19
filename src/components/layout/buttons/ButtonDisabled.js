import React from "react";

const ButtonDisabled = ({ children }) => {
  return (
    <button className="button button-disabled" disabled>
      {children}
    </button>
  );
};

export default ButtonDisabled;
