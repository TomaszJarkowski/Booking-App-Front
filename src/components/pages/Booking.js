import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Booking = () => {
  const { userData } = useContext(UserContext);

  return (
    <Route
      render={() =>
        userData.user ? <h3>Booking</h3> : <Redirect to="/login" />
      }
    />
  );
};

export default Booking;
