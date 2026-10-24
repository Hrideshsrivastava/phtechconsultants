import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The page may already hold pre-rendered HTML (see scripts/prerender.js); createRoot replaces it
// with the live app, so the browser behaves exactly as before.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
