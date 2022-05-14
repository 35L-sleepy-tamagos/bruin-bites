import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  let mealPeriod = "None Currently";
  let d = new Date();

  let hours = d.getHours();
  let mins = d.getMinutes();

  if (hours >= 7 && hours < 10) {
    mealPeriod = "Currently Breakfast";
  }

  if (hours >= 11 && hours < 15) {
    mealPeriod = "Currently Lunch/Brunch";
  }

  if (hours >= 17 && hours < 21) {
    mealPeriod = "Currently Dinner";
  }

  if (hours >= 21) {
    mealPeriod = "Currently Extended Dinner";
  }

  if (hours >= 10 && hours < 11) {
    let remainingHours = 11 - (hours + 1);
    remainingHours = "0" + remainingHours;
    let remainingMinutes = 60 - mins;
    if (remainingMinutes < 10) {
      remainingMinutes = "0" + remainingMinutes;
    }
    mealPeriod = remainingHours + ":" + remainingMinutes + " until Lunch";
  }

  if (hours >= 15 && hours < 17) {
    let remainingHours = 17 - (hours + 1);
    remainingHours = "0" + remainingHours;
    let remainingMinutes = 60 - mins;
    mealPeriod = remainingHours + ":" + remainingMinutes + " until Dinner";
  }

  if (hours < 7) {
    let remainingHours = 7 - (hours + 1);
    remainingHours = "0" + remainingHours;
    let remainingMinutes = 60 - mins;
    if (remainingMinutes < 10) {
      remainingMinutes = "0" + remainingMinutes;
    }
    mealPeriod = remainingHours + ":" + remainingMinutes + " until Breakfast";
  }

  return (
    <div className="nav-bg">
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
      <div className="Meal-Period" style={{ textDecoration: 'none', color: 'white' }}>
        { mealPeriod }
      </div>
    </div>
  );
};
export default Navbar;
