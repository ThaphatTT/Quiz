import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from './compenent/Navbar'
import Home from './compenent/Home'

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Home />
      </div>
    </Router>
  );
}