import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.tsx'
import { BrowserRouter } from "react-router";
import "./i18n/i18n.ts";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
