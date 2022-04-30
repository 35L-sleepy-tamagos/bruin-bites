import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/reviews">Reviews</Link>
      </li>
      <li>
        <Link to="/map">Map</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </div>
  );
};
export default Navbar;
