import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import Desks from './Components/Desks.tsx';
import Login from './Components/Login.tsx';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desks />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
