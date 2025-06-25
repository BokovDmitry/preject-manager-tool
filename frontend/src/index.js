import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import Desks from './Components/Desks.tsx';
import Login from './Components/Login.tsx';
import TaskList from './Components/TaskList.tsx'
import Home from './Components/Home.tsx'
import NavBar from './Components/NavBar.tsx'

export default function Main() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/desks" element={<Desks />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/tasks/:deskId" element={<TaskList />}></Route>
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
