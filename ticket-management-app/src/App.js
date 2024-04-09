import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './compenent/Navbar'
import Home from './compenent/Home'
import CreateTicket from './compenent/CreateTicket'

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateTicket />} />
        </Routes>
      </div>
    </Router>
  );
}
