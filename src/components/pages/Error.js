import React from "react";
import svg404 from "../../svg/404.svg";
const Error = () => {
  return (
    <div className="error-page">
      <div className="container">
        <h1>Page not found</h1>
        <img src={svg404} alt="error-page" />
      </div>
    </div>
  );
};

export default Error;
