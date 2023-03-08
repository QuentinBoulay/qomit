import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from "./components/client/Home/Home.js";
import Login from "./components/admin/Login.js";
import Dashboard from "./components/admin/Dashboard.js";
import Projects from './components/admin/Projects/Projects.js';
import ProjectDetails from './components/admin/Projects/ProjectDetails.js';
import Documents from './components/admin/Documents/Documents.js';
import Profile from './components/admin/Profile/Profile.js';
import DocumentsDetails from './components/admin/Documents/DocumentsDetails.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/documents/:id" element={<DocumentsDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );

}

export default App;