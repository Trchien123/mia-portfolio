import { useCallback, useEffect, useMemo, useRef, type RefObject } from 'react'
import { createSpring, type SpringEngine } from './spring'
import { useReducedMotion } from './useReducedMotion'

type SpringOptions = {
  omega: number
  zeta: number
  /** Hard clamp on the angle, degrees. */
  max: number
  /** Amplitude cap for repeat kicks, degrees (defaults to max). */
  energyCap?: number
  /** Per-frame target in degrees; read through a ref, so it may be a new function each render. */
  target?: (dt: number) => number
}

export type SpringHandle<T> = {
  ref: RefObject<T | null>
  kick(peak: number): void
  wake(): void
  busy(): boolean
}

/**
 * A damped spring bound to an element. It stops (and resets) when the element leaves
 * the viewport. No spring exists under reduced motion, so every call is a no-op.
 */
export function useSpring<T extends HTMLElement | SVGElement>(
  opts: SpringOptions,
): SpringHandle<T> {
  const { omega, zeta, max, energyCap = max, target } = opts
  const reduce = useReducedMotion()
  const ref = useRef<T>(null)
  const engine = useRef<SpringEngine | null>(null)
  const targetRef = useRef(target)

  useEffect(() => {
    targetRef.current = target
  })

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    const spring = createSpring(el, {
      omega,
      zeta,
      max,
      cap: energyCap,
      target: (dt) => targetRef.current?.(dt) ?? 0,
    })
    engine.current = spring
    const io = new IntersectionObserver((entries) => {
      const latest = entries[entries.length - 1]
      if (latest) spring.setOnScreen(latest.isIntersecting)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      spring.stop()
      engine.current = null
    }
  }, [omega, zeta, max, energyCap, reduce])

  const kick = useCallback((peak: number) => engine.current?.kick(peak), [])
  const wake = useCallback(() => engine.current?.wake(), [])
  const busy = useCallback(() => engine.current?.busy() ?? false, [])
  return useMemo(() => ({ ref, kick, wake, busy }), [kick, wake, busy])
}
