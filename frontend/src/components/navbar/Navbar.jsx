import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import "../../App.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const authLinks = (
    <ul>
      <li>
        <Link to="/timeline">
          <span className="hide-sm">Timeline posts</span>
        </Link>
      </li>
      <li>
        <Link to="/friends">
          <span className="hide-sm">Friends</span>
        </Link>
      </li>
      <li>
        <Link to="/my">
          <span className="hide-sm">My posts</span>
        </Link>
      </li>
      <li>
        <Link onClick={(e) => dispatch(logout())} to="#!">
          <i class="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Join</Link>
      </li>
      <li>
        <Link to="/login">Sign In</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className="fab fa-angellist"></i> Twitter
        </Link>
      </h1>
      {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  );
}
