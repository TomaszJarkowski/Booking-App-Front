import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import UserContext from "./context/UserContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await fetch("http://localhost:3000/users/tokenIsValid", {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
      });
      const tokenResJson = await tokenRes.json();
      if (tokenResJson) {
        const user = await fetch("http://localhost:3000/users", {
          headers: { "x-auth-token": token },
        });
        const userJson = await user.json();
        setUserData({
          ...userData,
          token,
          user: userJson,
        });
      }
    };

    checkLoggedIn();
    console.log(userData);
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
