import React, { useEffect, useState } from "react";

const dataNamesDays = [
  { number: 0, name: "Sunday" },
  { number: 1, name: "Monday" },
  { number: 2, name: "Tuesday" },
  { number: 3, name: "Wednesday" },
  { number: 4, name: "Thursday" },
  { number: 5, name: "Friday" },
  { number: 6, name: "Saturday" },
];

const Calendary = () => {
  const [todayDate, setTodayDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);

  const isValidDate = (dateString) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
  };

  useEffect(() => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    console.log(today.getDay());
    today = yyyy + "-" + mm + "-" + dd;
    setTodayDate(today);
    const arr = [];

    for (let i = 0; i < 15; i++) {
      if (isValidDate(yyyy + "-" + mm + "-" + (Number(dd) + i))) {
        let todayName = new Date(yyyy + "-" + mm + "-" + (Number(dd) + i));

        arr.push({
          year: yyyy,
          month: mm,
          day: Number(dd) + i,
          name: todayName.getDay(),
        });
      } else if (isValidDate(yyyy + "-"(Number(mm) + 1)) + "-" + (1 + i)) {
        let todayName = new Date(yyyy + "-"(Number(mm) + 1)) + "-" + (1 + i);

        arr.push({
          year: yyyy,
          month: Number(mm) + 1,
          day: 1 + i,
          name: todayName.getDay(),
        });
      } else {
        let todayName = new Date(Number(yyyy) + 1 + "-" + 1 + i + "-" + 1 + i);

        arr.push({
          year: Number(yyyy) + 1,
          month: 1 + i,
          day: 1 + i,
          name: todayName.getDay(),
        });
      }
    }
    setAvailableDates(arr);
  }, []);
  const NameDay = ({ name }) =>
    dataNamesDays.map((el) => {
      console.log(name, el.number, el.name);
      if (el.number === name) {
        return <h2>{el.name}</h2>;
      }
    });
  console.log(availableDates);
  const Tiles = () =>
    availableDates.map((date) => (
      <div className="tile">
        <h1>{date.day}</h1>
        <NameDay name={date.name} />
        <h2>{date.month}</h2>
        <h3>{date.year}</h3>
      </div>
    ));
  return (
    <div className="board">
      <Tiles />
    </div>
  );
};

export default Calendary;
