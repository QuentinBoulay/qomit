import React from 'react';
import Home from "./components/client/Home.js";
import EspaceClient from "./components/admin/EspaceClient.js";
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<EspaceClient />} />
      </Routes>
    );

}

export default App;