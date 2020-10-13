import React from "react";
import Modal from "./Modal";
const TimeForm = () => {
  return (
    <Modal>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" />
        <label htmlFor="time">Time</label>
        <input type="date" id="time" />
        <button className="button button-prymary">Check available</button>
      </form>
    </Modal>
  );
};

export default TimeForm;
