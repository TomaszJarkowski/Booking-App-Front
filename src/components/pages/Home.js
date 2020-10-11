import React from "react";
import svg from "../../svg/undraw_Booking_re_gw4j.svg";
const Home = () => {
  return (
    <h2 className="page page-home">
      <div className="container">
        <div className="content">
          <h1>Ten-Go Baba</h1>
          <h2>Book a table in the best restaurant in Poland</h2>
          <button className="button button-primary">booking</button>
        </div>
        <img src={svg} alt="" />
      </div>
    </h2>
  );
};

export default Home;
