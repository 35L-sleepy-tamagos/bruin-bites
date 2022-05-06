import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Home</Link>
      </li>
      <li>
        <Link to="/reviews" style={{ textDecoration: 'none', color: 'white' }}>Reviews</Link>
      </li>
      <li>
        <Link to="/map" style={{ textDecoration: 'none', color: 'white' }}>Map</Link>
      </li>
      <li>
        <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</Link>
      </li>
    </div>
  );
};
export default Navbar;
