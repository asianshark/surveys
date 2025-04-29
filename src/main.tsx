import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.tsx'
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n.ts";
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
