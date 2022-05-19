import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Map from "./pages/Map";

import { useState } from "react";
import Splash from "./components/SplashScreen";
import { ThemeProvider } from "styled-components";

const LightTheme = {
  pageBackground: "white",
  titleColor: "#dc658b",
  tagLineColor: "black"
};

const DarkTheme = {
  pageBackground: "#282c36",
  titleColor: "lightpink",
  tagLineColor: "lavender"
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}


function App() {
  const [theme, setTheme] = useState("light")
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
      </Routes>
    </Router>
  );
}

export default App;
