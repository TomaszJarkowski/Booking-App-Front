import React, { useEffect, useState } from "react";
import TimeForm from "./TimeForm";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";

const dataNamesDays = [
  { shortCut: "Sun", name: "Sunday" },
  { shortCut: "Mon", name: "Monday" },
  { shortCut: "Tue", name: "Tuesday" },
  { shortCut: "Wed", name: "Wednesday" },
  { shortCut: "Thu", name: "Thursday" },
  { shortCut: "Fri", name: "Friday" },
  { shortCut: "Sat", name: "Saturday" },
];

const Calendary = () => {
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const arr = [];

    for (let i = 0; i < 16; i++) {
      const fortnightAway = new Date(
        Date.now() + 1000 * 60 * 60 * 24 * (1 * i)
      ).toString();

      arr.push({
        year: fortnightAway.slice(11, 16),
        month: fortnightAway.slice(4, 7),
        day: fortnightAway.slice(8, 10),
        name: fortnightAway.slice(0, 3),
      });
      console.log(arr);
    }
    setAvailableDates(arr);
  }, []);
  const NameDay = ({ name }) =>
    dataNamesDays.map((el) => {
      if (el.shortCut === name) {
        return <h2>{el.name}</h2>;
      }
    });

  const Tiles = () =>
    availableDates.map((date) => (
      <NavLink to="/booking/form">
        <div className="tile">
          <h1>{date.day}</h1>
          <NameDay name={date.name} />
          <h2>{date.month}</h2>
          <h3>{date.year}</h3>
        </div>
      </NavLink>
    ));
  return (
    <>
      <div className="board">
        <Tiles />
      </div>
      <Switch>
        <Route path="/booking/form">
          <TimeForm />
        </Route>
      </Switch>
    </>
  );
};

export default Calendary;
