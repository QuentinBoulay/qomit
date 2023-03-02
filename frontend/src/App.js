import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from "./components/client/Home/Home.js";
import Login from "./components/admin/Login.js";
import Dashboard from "./components/admin/Dashboard.js";
import ProjectsList from './components/admin/Projects/ProjectsList.js';
import DocumentsList from './components/admin/Documents/DocumentsList.js';
import Profile from './components/admin/Profile/Profile.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projectsList" element={<ProjectsList />} />
      <Route path="/documentsList" element={<DocumentsList />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );

}

export default App;