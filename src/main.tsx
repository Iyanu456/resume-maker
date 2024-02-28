import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Home from './Home.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accordion from './Accordion2.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/app" element={<App />} />
        <Route path="/acc" element={<Accordion />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
