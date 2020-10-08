import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
