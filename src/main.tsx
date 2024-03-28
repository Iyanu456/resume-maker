"use strict"
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage.tsx';
import Test from './testcomp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/test" element={<Test />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
