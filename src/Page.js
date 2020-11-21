import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Booking from "./components/pages/Booking";
import Home from "./components/pages/Home";
import Error from "./components/pages/Error";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Forgot from "./components/auth/Forgot";

const Page = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/booking" component={Booking} />
        <Route path="/" component={Error} />
      </Switch>
    </>
  );
};

export default Page;
