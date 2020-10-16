import React from "react";
import { NavLink } from "react-router-dom";

const Books = (props) =>
  props.books.map((el) => (
    <div className="book">
      <div className="date">
        {el.dateDay}-{el.dateMonth}-{el.dateYear}
      </div>
      <div className="hour">{el.hour}</div>
      <div className="name">
        {el.firstName} {el.lastName}
      </div>
      <div className="seats">{el.numberOfSeats}</div>
      <NavLink
        to="/dashboard/accept"
        onClick={() => props.setElToRemove(el)}
        className="fas fa-times"
      ></NavLink>
    </div>
  ));

export default Books;
