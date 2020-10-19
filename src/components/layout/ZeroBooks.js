import React from "react";
import { useHistory } from "react-router-dom";
const ZeroBooks = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/booking");
  };
  return (
    <div className="zero-books">
      <h2>
        You don't have any reservations{" "}
        <span role="img" aria-label="crying">
          😢
        </span>
      </h2>
      <button className="button button-primary" onClick={handleClick}>
        Booking
      </button>
    </div>
  );
};

export default ZeroBooks;
