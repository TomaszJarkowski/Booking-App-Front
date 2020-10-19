import React, { useContext, useState } from "react";
import BookContext from "../../../context/BookContext";
import Modal from "../Modal";
import validationBook from "../../../validation/validationBook";
import Success from "./Success";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonDisabled from "../buttons/ButtonDisabled";
const HourForm = () => {
  const { bookData } = useContext(BookContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("1");
  const [hour, setHour] = useState("10:00");
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const postData = () => {
    setLoading(true);
    fetch("http://localhost:3000/book", {
      method: "POST",
      body: JSON.stringify({
        ...bookData,
        firstName: name,
        lastName,
        numberOfSeats,
        hour,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setError(data.error);
          setIsError(true);
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to fetch");
        setIsError(true);
      });
  };

  const submit = (e) => {
    e.preventDefault();
    postData();
  };

  const validation = () => {
    setIsError(false);
    try {
      validationBook(name, lastName);
    } catch (e) {
      setIsError(true);
      setError(e.message);
    }
  };

  return (
    <Modal>
      <form className="form-time" onSubmit={submit}>
        {success ? <Success /> : null}
        <>
          <h2>Complete the form</h2>
          <h4>
            {bookData.dateDay}-{bookData.dateMonth}-{bookData.dateYear}
          </h4>
          <h4>{bookData.email}</h4>
          <label htmlFor="firstName">
            First Name <span className="star">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            onKeyUp={validation}
            onKeyDown={validation}
            onChange={(e) => {
              setName(e.target.value);
              validation();
            }}
          />
          <label htmlFor="lastName">
            Last Name <span className="star">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            onKeyUp={validation}
            onKeyDown={validation}
            onChange={(e) => {
              setLastName(e.target.value);
              validation();
            }}
          />
          <label htmlFor="numberOfSeats">
            Number Of Seats <span className="star">*</span>
          </label>
          <select
            name="numberOfSeats"
            id="numberOfSeats"
            onChange={(e) => setNumberOfSeats(e.target.value)}
          >
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
          <select
            name="hour"
            id="hour"
            onChange={(e) => setHour(e.target.value)}
          >
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
          {loading ? <Spinner /> : null}
          {isError ? <ErrorMessage error={error} /> : null}
          {isError ? (
            <ButtonDisabled>Book a table</ButtonDisabled>
          ) : (
            <ButtonPrimary>Book a table</ButtonPrimary>
          )}
        </>
      </form>
    </Modal>
  );
};

export default HourForm;
