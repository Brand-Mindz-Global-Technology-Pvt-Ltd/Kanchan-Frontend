import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import Home from './pages/Home.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)