import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Modal from "../layout/Modal";
import { useHistory } from "react-router-dom";
import Books from "../layout/Books";
const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const [elToRemove, setElToRemove] = useState({});

  useEffect(() => {
    const downloadData = async () => {
      const bookRes = await fetch("http://localhost:3000/book/get", {
        method: "POST",
        body: JSON.stringify({ userId: userData.user.id }),
        headers: { "Content-Type": "application/json" },
      });
      const bookResJson = await bookRes.json();
      console.log(bookResJson);
      if (bookResJson) {
        setBooks(bookResJson);
      }
    };
    if (userData.user) {
      downloadData();
    }
  }, []);

  const removeBook = () => {
    fetch("http://localhost:3000/book", {
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
        console.log(data);
        console.log(books);
        setBooks(books.filter((el) => el._id !== data._id));
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Accept = () => (
    <Modal>
      <div className="accept-modal">
        <h2>Are you sure you want to delete this reservation?</h2>
        <button className="button button-danger" onClick={removeBook}>
          YES
        </button>
      </div>
    </Modal>
  );

  return (
    <Route
      render={() =>
        userData.user ? (
          <div className="dashboard">
            <div className="container">
              <Switch>
                <Route path="/dashboard/accept">
                  <Accept />
                </Route>
              </Switch>
              <div className="dashboard__myData">
                <h2>My Data</h2>
                <h3>Email: {userData.user.email}</h3>
                <h3>Username: {userData.user.userName}</h3>
                <div className="buttons">
                  <button className="button button-secondary">
                    Change user name
                  </button>
                  <button className="button button-secondary">
                    Change password
                  </button>
                  <button className="button button-danger">
                    Delete account
                  </button>
                </div>
              </div>
              <div className="dashboard__books">
                <h2>My Books</h2>
                <div className="books">
                  <Books books={books} setElToRemove={setElToRemove} />
                </div>
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
