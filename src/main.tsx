import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/global.css'
import './motion/motion.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// Tells the index.html failsafe the bundle ran, so it keeps html.js.
;(window as { __appMounted?: boolean }).__appMounted = true
