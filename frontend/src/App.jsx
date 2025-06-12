import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/ui/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Destinations from "./pages/Destination"; // <-- Corrected import (plural!)
import Contact from "./pages/Contact";
import DestinationDetail from "./pages/DestinationDetail";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
      </Routes>
    </Router>
  );
}