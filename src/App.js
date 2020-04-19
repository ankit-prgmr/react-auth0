import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Auth from "./Auth/Auth";
import Callback from "./components/Callback";
import Public from "./components/Public";
import Private from "./components/Private";
import Courses from "./components/Courses";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./AuthContext";

function App(props) {
  const auth = new Auth(props.history);
  let [tokenRenewal, setTokenRenewal] = useState(false);
  useEffect(() => {
    console.log("Use effect called");
    auth.renewToken(() => {
      setTokenRenewal(true);
    });
  });

  if (!tokenRenewal) return "Loading...";

  return (
    <AuthContext.Provider value={auth}>
      <Nav auth={auth} />
      <div className="body">
        <Route
          path="/"
          exact
          render={(props) => <Home auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={auth} {...props} />}
        />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/public" component={Public} />
        <PrivateRoute path="/private" component={Private} />
        <PrivateRoute
          path="/courses"
          component={Courses}
          scope={["read:courses"]}
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
