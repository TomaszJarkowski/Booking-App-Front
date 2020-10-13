import React, { useContext } from "react";
import BookContext from "../../context/BookContext";
import Modal from "./Modal";
const TimeForm = () => {
  const { bookData, setBookData } = useContext(BookContext);
  const submit = (e) => {
    e.preventDefault();
    console.log(bookData);
  };
  return (
    <Modal>
      <form className="form-time" onSubmit={submit}>
        <h2>Complete the form</h2>
        <h4>
          {bookData.dateDay}-{bookData.dateMonth}-{bookData.dateYear}
        </h4>
        <h4>{bookData.email}</h4>
        <label htmlFor="firstName">
          First Name <span className="star">*</span>
        </label>
        <input type="text" id="firstName" />
        <label htmlFor="lastName">
          Last Name <span className="star">*</span>
        </label>
        <input type="text" id="lastName" />
        <label htmlFor="numberOfSeats">
          Number Of Seats <span className="star">*</span>
        </label>
        <select name="numberOfSeats" id="numberOfSeats">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <label htmlFor="hour">
          Hour <span className="star">*</span>
        </label>
        <select name="hour" id="hour">
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
        </select>
        <button className="button button-primary">Book a table</button>
      </form>
    </Modal>
  );
};

export default TimeForm;
