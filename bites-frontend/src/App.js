import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Map from "./pages/Map";

function App() {
  return (
    <Router>
      <Navbar />
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
