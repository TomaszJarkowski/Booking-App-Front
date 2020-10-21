import React from "react";
import { useHistory } from "react-router-dom";
import svg from "../../svg/undraw_Booking_re_gw4j.svg";
import ButtonPrimary from "../layout/buttons/ButtonPrimary";
const Home = () => {
  const history = useHistory();
  const handleClick = () => history.push("/booking");
  return (
    <div className="page-home">
      <div className="container">
        <div className="content">
          <h1 className="home__title">Restaurant</h1>
          <h2 className="home__description">
            Book a table in the best restaurant in Poland
          </h2>
          <ButtonPrimary onClick={handleClick}>booking</ButtonPrimary>
        </div>
        <img src={svg} alt="booking_svg" className="home__svg" />
      </div>
    </div>
  );
};

export default Home;
