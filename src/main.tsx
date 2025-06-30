import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Add Buffer polyfill for @ketan_nimase/ui package
import { Buffer } from 'buffer'
window.Buffer = Buffer

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <App />
  // </StrictMode>,
)
