"use strict"
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import App2 from './PDFComponent.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage.tsx';
import DomTest from './components/DOMtest'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/test" element={<DomTest />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
