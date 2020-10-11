import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/">
          <h1 className="logo">
            <i className="fas fa-utensils"></i>Booking App
          </h1>
        </Link>
        <AuthOptions />
      </div>
    </nav>
  );
};

export default Navbar;
