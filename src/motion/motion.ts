import { prefersReducedMotion } from './useReducedMotion'

/** App start, for the NOW flip target (DESIGN.md Motion: --now-at is measured from t0). */
export const t0 = performance.now()

/** True when index.html armed motion (`html.js`) and reduced motion is not requested. */
export function isMotionOn(): boolean {
  return document.documentElement.classList.contains('js') && !prefersReducedMotion()
}

/** A boolean state as a data attribute: present when on, absent when off. */
export function dataOn(on: boolean): true | undefined {
  return on || undefined
}

export const TAG_VIEW = { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
export const HEADING_VIEW = { threshold: 0.3, rootMargin: '0px 0px -6% 0px' }
