import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Accept from "../layout/dashboard/Accept";
import { useHistory } from "react-router-dom";
import Books from "../layout/dashboard/Books";
import ZeroBooks from "../layout/dashboard/ZeroBooks";
import DeleteAccount from "../layout/dashboard/DeleteAccount";
import ChangeUsername from "../layout/dashboard/ChangeUsername";
import ChangePassword from "../layout/dashboard/ChangePassword";
import Spinner from "../layout/Spinner";
import ButtonDanger from "../layout/buttons/ButtonDanger";
const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [elToRemove, setElToRemove] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const downloadData = async () => {
      setLoading(true);
      const bookRes = await fetch(
        "https://booking-app-back.herokuapp.com/book/get",
        {
          method: "POST",
          body: JSON.stringify({ userId: userData.user.id }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const bookResJson = await bookRes.json();
      if (bookResJson) {
        setBooks(bookResJson);
      }
      setLoading(false);
    };
    if (userData.user) {
      downloadData();
    }
  }, [userData.user]);

  const removeBook = () => {
    fetch("https://booking-app-back.herokuapp.com/book", {
      method: "DELETE",
      body: JSON.stringify({
        id: elToRemove._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(books.filter((el) => el._id !== data._id));
        history.push("/dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Route
      render={() =>
        userData.user ? (
          <div className="page-dashboard">
            <div className="container">
              <Switch>
                <Route path="/dashboard/accept">
                  <Accept removeBook={removeBook} />
                </Route>
                <Route path="/dashboard/changeUsername">
                  <ChangeUsername />
                </Route>
                <Route path="/dashboard/deleteAccount">
                  <DeleteAccount />
                </Route>
                <Route path="/dashboard/changePassword">
                  <ChangePassword />
                </Route>
              </Switch>
              <div className="dashboard__myData">
                <h1>My Data</h1>
                <h2>Email: {userData.user.email}</h2>
                <h2>Username: {userData.user.userName}</h2>
                <div className="buttons">
                  <button
                    className="button button-secondary"
                    onClick={() => history.push("/dashboard/changeUsername")}
                  >
                    Change user name
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={() => history.push("/dashboard/changePassword")}
                  >
                    Change password
                  </button>
                  <ButtonDanger
                    onClick={() => history.push("/dashboard/deleteAccount")}
                  >
                    Delete account
                  </ButtonDanger>
                </div>
              </div>
              <div className="dashboard__books">
                <h1>My Books</h1>
                <div className="colors">
                  <div className="color today">
                    <h3>Reservations for today</h3>
                    <div></div>
                  </div>
                  <div className="color dedline">
                    <h3>After the deadline</h3>
                    <div></div>
                  </div>
                  <div className="color fewDays">
                    <h3>Other reservations</h3>
                    <div></div>
                  </div>
                </div>
                {loading ? (
                  <Spinner />
                ) : books.length ? (
                  <div className="books">
                    <Books books={books} setElToRemove={setElToRemove} />
                  </div>
                ) : (
                  <ZeroBooks />
                )}
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default Dashboard;
