import "../css/Navbar.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { auth } from "../components/firebaseConfig/firebase";
import { getUsers } from "../components/firebaseConfig/utils.js";

import Mascot from "../assets/mascot.png";
import ProfileImage from "../assets/profileImage.png";

const Navbar = ({ user }) => {
  /* functions to navigate the difference pages */
  /* used as onClick events */
  const navigate = useNavigate();

  async function returnHome() {
    navigate("/");
  }

  async function seeProfile() {
    navigate("/profile");
  }

  /* stateful variables */
  let [mealPeriod, setPeriod] = useState("None Currently");
  let [profileImage, setProfileImage] = useState(ProfileImage)

  /* a really long and prob overcomplicated way to get the time until
    next meal */

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setProfileImage(ProfileImage)
        return;
      }
      setProfileImage(user.photoURL);
    })
  }, [])


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
      mealPeriod = "Breakfast";
    }

    if (hours >= 11 && hours < 15) {
      mealPeriod = "Lunch/Brunch";
    }

    if (hours >= 17 && hours < 21) {
      mealPeriod = "Dinner";
    }

    if (hours >= 21) {
      mealPeriod = "Extended Dinner";
    }

    if (hours >= 10 && hours < 11) {
      remainingHours = 11 - (hours + 1);
      remainingHours = "0" + remainingHours;
      remainingMinutes = 59 - mins;
      remainingSeconds = 59 - seconds;
      if (remainingMinutes < 10) {
        remainingMinutes = "0" + remainingMinutes;
      }
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      mealPeriod =
        remainingHours +
        ":" +
        remainingMinutes +
        ":" +
        remainingSeconds +
        " until Lunch";
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
      mealPeriod =
        remainingHours +
        ":" +
        remainingMinutes +
        ":" +
        remainingSeconds +
        " until Dinner";
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
      mealPeriod =
        remainingHours +
        ":" +
        remainingMinutes +
        ":" +
        remainingSeconds +
        " until Breakfast";
    }
    setPeriod(mealPeriod);
  }

  /* refetch the date every 500ms to account for some time offset */
  useEffect(() => {
    const interval = setInterval(() => {
      showDate();
    }, 500);

    return () => clearInterval(interval);
  });

  return (
      <div className="nav-bg">
        <li className="expand">
          <img
            src={Mascot}
            className="logo"
            alt="Logo"
            onClick={returnHome}
          ></img>
        </li>
        <li className="expand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </li>
        <li className="expand">
          <Link
            to="/reviews"
            style={{ textDecoration: "none", color: "white" }}
          >
            Reviews
          </Link>
        </li>
        <li className="expand">
          <Link to="/map" style={{ textDecoration: "none", color: "white" }}>
            Map
          </Link>
        </li>
        <li className="expand">
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "white" }}
          >
            Profile
          </Link>
        </li>
        <li className="expand">
          <Link to="/venue" style={{ textDecoration: "none", color: "white" }}>
            TODO
          </Link>
        </li>
        <div
          className="Meal-Period"
          style={{ textDecoration: "none", color: "white" }}
        >
          {mealPeriod}
        </div>
        <div>
          <img
            src={profileImage}
            className="profile-image expand"
            alt="Profile"
            onClick={seeProfile}
          ></img>
        </div>
      </div>
    )
};

export default Navbar;
