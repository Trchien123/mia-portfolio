import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(QUERY).matches
}

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/** Live `prefers-reduced-motion: reduce` state. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false)
}
