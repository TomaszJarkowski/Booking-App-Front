import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";

const Modal = ({ children }) => {
  const history = useHistory();

  const handleClose = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return createPortal(
    <div className="modal__wrapper" onClick={handleClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__closeIcon" onClick={handleClose}>
          X
        </div>
        {children}
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
