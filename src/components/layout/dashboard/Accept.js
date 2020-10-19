import React from "react";
import Modal from "../Modal";
import ButtonDanger from "../buttons/ButtonDanger";
const Accept = (props) => (
  <Modal>
    <div className="accept-modal">
      <h2>Are you sure you want to delete this reservation?</h2>
      <ButtonDanger onClick={props.removeBook}>YES</ButtonDanger>
    </div>
  </Modal>
);

export default Accept;
