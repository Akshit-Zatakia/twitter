import { Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/auth";
import setAuthToken from "./setAuthToken";

export default function PrivateRoute({ Component, ...rest }) {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }

  // const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
}
