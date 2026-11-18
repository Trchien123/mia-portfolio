import { StrictMode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/global.css'
import './motion/motion.css'

flushSync(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
// The browser's own anchor jump ran before the SPA rendered; redo it now.
if (location.hash.length > 1) {
  let target: Element | null = null
  try {
    target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  } catch {
    /* malformed hash: ignore */
  }
  target?.scrollIntoView({ behavior: 'instant' })
}
// Tells the index.html failsafe the bundle ran, so it keeps html.js.
;(window as { __appMounted?: boolean }).__appMounted = true
