"use strict"
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
//import { useState, useEffect, createContext, useContext } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import LandingPage from './LandingPage.tsx';
import { ScaleProvider } from './ScaleContext.tsx'
import SigninLogin from './SignupPage.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScaleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signup" element={<QueryClientProvider client={queryClient}><SigninLogin /></QueryClientProvider>} />
        </Routes>
      </BrowserRouter>
    </ScaleProvider>
  </React.StrictMode>,
)
