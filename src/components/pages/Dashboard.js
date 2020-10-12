import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Dashboard = () => {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <Route
      render={() =>
        userData.user ? <h3>Dashboard</h3> : <Redirect to="/login" />
      }
    />
  );
};

export default Dashboard;
