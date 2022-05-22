import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css//Navbar.css";
import { logout } from "../components/firebaseConfig/utils.js"

const Navbar = () => {
  let [mealPeriod, setPeriod] = useState("None Currently")
  let d;
  let hours;
  let mins; 
  let seconds;
  let remainingHours;
  let remainingMinutes;
  let remainingSeconds;

  function showDate() {
    d = new Date();
  
    hours = d.getHours();
    mins = d.getMinutes();
    seconds = d.getSeconds();
  
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
      remainingHours = 11 - (hours + 1);
      remainingHours = "0" + remainingHours;
      remainingMinutes = 59 - mins;
      remainingSeconds = 59- seconds;
      if (remainingMinutes < 10) {
        remainingMinutes = "0" + remainingMinutes;
      }
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      mealPeriod = remainingHours + ":" + remainingMinutes + ":" + remainingSeconds + " until Lunch";
    }
  
    if (hours >= 15 && hours < 17) {
      remainingHours = 17 - (hours + 1);
      remainingHours = "0" + remainingHours;
      remainingMinutes = 59 - mins;
      remainingSeconds = 59 - seconds;
      if (remainingMinutes < 10) {
        remainingMinutes = "0" + remainingMinutes;
      }
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      mealPeriod = remainingHours + ":" + remainingMinutes + ":" + remainingSeconds + " until Dinner";
    }
  
    if (hours < 7) {
      let remainingHours = 7 - (hours + 1);
      remainingHours = "0" + remainingHours;
      let remainingMinutes = 60 - mins;
      remainingSeconds = 60 - seconds;
      if (remainingMinutes < 10) {
        remainingMinutes = "0" + remainingMinutes;
      }
      if (remainingMinutes === 60) {
        remainingMinutes = "00";
        remainingHours += 1;
      }
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      if (remainingSeconds === 60) {
        remainingSeconds = "00";
        remainingMinutes += 1;
      }
      mealPeriod = remainingHours + ":" + remainingMinutes + ":" + remainingSeconds + " until Breakfast";
    }
    setPeriod(mealPeriod);
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      showDate();
    }, 500);
    
    return () => clearInterval(interval);
  });

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
