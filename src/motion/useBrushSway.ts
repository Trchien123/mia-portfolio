import { useEffect, useRef } from 'react'
import { useSpring } from './useSpring'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const MAX = 1.2
const ARM_FALLBACK_MS = 1600

const clamp = (n: number, lim: number) => Math.max(-lim, Math.min(lim, n))

/**
 * Hero brush sway: a mouse moving across the hero tag sways its face, at most ±1.2°.
 * Fine pointers only, armed once the entrance drop has ended. Returns refs for the tag
 * (pointer surface and owner of the drop animation) and for the face (what rotates).
 */
export function useBrushSway<Tag extends HTMLElement, Face extends HTMLElement>() {
  const tagRef = useRef<Tag>(null)
  const vx = useRef(0)
  const spring = useSpring<Face>({
    omega: 7,
    zeta: 0.3,
    max: MAX,
    energyCap: MAX,
    target: (dt) => {
      // Pointer velocity decays while the pointer rests, so the tag drifts back to hanging straight.
      vx.current *= Math.pow(0.02, dt)
      return clamp(-vx.current * 0.6, MAX)
    },
  })
  const { wake } = spring

  useEffect(() => {
    const tag = tagRef.current
    if (!tag || !window.matchMedia(FINE_POINTER).matches) return
    let ready = false
    let lastX: number | null = null
    let lastT = 0
    const arm = () => {
      ready = true
    }
    const timer = window.setTimeout(arm, ARM_FALLBACK_MS)
    const onEnd = (e: AnimationEvent) => {
      if (e.target === tag) arm()
    }
    const onMove = (e: PointerEvent) => {
      if (!ready || e.pointerType !== 'mouse') return
      const now = e.timeStamp
      if (lastX !== null && now > lastT) {
        const inst = clamp((e.clientX - lastX) / (now - lastT), 4)
        vx.current = vx.current * 0.6 + inst * 0.4
      }
      lastX = e.clientX
      lastT = now
      wake()
    }
    const onLeave = () => {
      // Let go: the target falls back to 0 and the face swings through it once or twice.
      lastX = null
      if (ready) wake()
    }
    tag.addEventListener('animationend', onEnd)
    tag.addEventListener('pointermove', onMove)
    tag.addEventListener('pointerleave', onLeave)
    return () => {
      window.clearTimeout(timer)
      tag.removeEventListener('animationend', onEnd)
      tag.removeEventListener('pointermove', onMove)
      tag.removeEventListener('pointerleave', onLeave)
    }
  }, [wake])

  return { tagRef, faceRef: spring.ref }
}
