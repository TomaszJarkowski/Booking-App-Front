import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Calendary from "../layout/Calendary";
const Booking = () => {
  const { userData } = useContext(UserContext);
  const BookingPage = () => (
    <div className="page-booking">
      <div className="container">
        <h1>Booking</h1>
        <h2>Select the day and time and we will reserve a table for you ❤</h2>
        <Calendary />
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
