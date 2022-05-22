import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Venue from "./pages/Venue";
import { auth } from "./components/firebaseConfig/firebase.js";

import { useState } from "react";
import Splash from "./components/SplashScreen";
import { ThemeProvider } from "styled-components";

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { onAuthStateChanged } from "firebase/auth";

const LightTheme = {
  padding: "0.25em 1em",
  pageBackground: "white",
  titleColor: "#dc658b",
  tagLineColor: "black",
};

const DarkTheme = {
  padding: "0.25em 1em",
  pageBackground: "#282c36",
  titleColor: "lightpink",
  tagLineColor: "lavender",
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}

function getUser() {
  if(auth.currentUser) {
    console.log(auth.currentUser.email);
  }
  else {
    console.log("none");
  }
}

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <Router>
      <Navbar />
      <ThemeProvider theme={themes[theme]}>
        <Splash theme={theme} setTheme={setTheme} />
      </ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reviews" element={<Review />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/signin" element={<SignIn />}></Route> 
        <Route path="/register" element={<Register />}></Route> 
        <Route path="/venue" element={<Venue />}></Route> 
      </Routes>
    </Router>
  );
}

export default App;
