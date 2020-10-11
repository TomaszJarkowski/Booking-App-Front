import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Page from "./Page";
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
          <Navbar />
          <Page />
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
