import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import "antd/dist/antd.css";
import Register from "./pages/register/Register";
import store from "./store";
import { Provider, useSelector } from "react-redux";

import { loadUser } from "./redux/actions/auth";
import Home from "./pages/home/Home";
import setAuthToken from "./utils/setAuthToken";

import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import TimelinePost from "./pages/timeline/TimelinePost";
import MyPosts from "./pages/myPosts/MyPosts";

import Users from "./pages/users/Users";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("done");
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <section className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/home" Component={Home} />
              <PrivateRoute exact path="/timeline" Component={TimelinePost} />
              <PrivateRoute exact path="/my" Component={MyPosts} />
              <PrivateRoute exact path="/friends" Component={Users} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
