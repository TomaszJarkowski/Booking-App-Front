import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Calendar from "../layout/calendary/Calendar";
const Booking = () => {
  const { userData } = useContext(UserContext);
  const BookingPage = () => (
    <div className="page-booking">
      <div className="container">
        <h1>Booking</h1>
        <h2>Select the day and hour and we will reserve a table for you ❤</h2>
        <Calendar />
      </div>
    </div>
  );

  return (
    <Route
      render={() =>
        userData.user ? <BookingPage /> : <Redirect to="/login" />
      }
    />
  );
};

export default Booking;
