import React from "react";
import { NavLink } from "react-router-dom";

const actualDate = new Date().getTime();
const Books = (props) => {
  const cloneArr = [...props.books];

  cloneArr
    .sort(function (a, b) {
      return (
        new Date(`${b.dateDay}-${b.dateMonth}-${b.dateYear}-${b.hour}`) -
        new Date(`${a.dateDay}-${a.dateMonth}-${a.dateYear}-${a.hour}`)
      );
    })
    .reverse();

  return cloneArr.map((el) => {
    const convertDate = new Date(
      `${el.dateDay}-${el.dateMonth}-${el.dateYear}-${el.hour}`
    ).getTime();
    return (
      <div
        className="book"
        style={
          convertDate > actualDate &&
          new Date(actualDate).toString().slice(0, 15) ===
            new Date(convertDate).toString().slice(0, 15)
            ? { borderBottom: "solid 8px #11998e" }
            : convertDate < actualDate
            ? { borderBottom: "solid 8px rgb(219, 46, 46)" }
            : null
        }
        key={Math.random()}
      >
        <h3 className="date">
          {el.dateDay}-{el.dateMonth}-{el.dateYear}
        </h3>
        <h3 className="hour">{el.hour}</h3>
        <h3 className="name">
          {el.firstName} {el.lastName}
        </h3>
        <h3 className="seats">{el.numberOfSeats}</h3>
        <NavLink
          to="/dashboard/accept"
          onClick={() => props.setElToRemove(el)}
          className="fas fa-times"
        ></NavLink>
      </div>
    );
  });
};

export default Books;
