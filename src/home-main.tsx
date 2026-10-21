import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import Navbar from './components/layout/Navbar.tsx'
import Home from './pages/Home.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <div className="min-h-screen bg-white">
      <Navbar />
      <Home />
    </div>
  </StrictMode>,
)