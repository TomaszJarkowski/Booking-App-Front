import React from "react";
import Modal from "./Modal";

const Accept = (props) => (
  <Modal>
    <div className="accept-modal">
      <h2>Are you sure you want to delete this reservation?</h2>
      <button className="button button-danger" onClick={props.removeBook}>
        YES
      </button>
    </div>
  </Modal>
);

export default Accept;
