import React from 'react';
import Home from "./components/client/Home/Home.js";
import Login from "./components/admin/Login.js";
import Dashboard from "./components/admin/Dashboard.js";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );

}

export default App;