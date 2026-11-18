import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../motion/useReducedMotion'
import styles from './PriceGunLabel.module.css'

type PriceGunLabelProps = {
  text: string
  /** Increments on every copy; each new value fires the label again. 0 = never fired. */
  shot: number
}

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_IN_QUART = 'cubic-bezier(0.5, 0, 0.75, 0)'

/** Shoots out (clip + slide, ~220ms), holds, then peels off. */
const GUN: Keyframe[] = [
  {
    opacity: 1,
    clipPath: 'inset(0 100% 0 0)',
    transform: 'translateX(-14px) rotate(-3deg)',
    offset: 0,
    easing: EASE_OUT,
  },
  {
    opacity: 1,
    clipPath: 'inset(0 0 0 0)',
    transform: 'translateX(0) rotate(-3deg)',
    offset: 0.12,
  },
  {
    opacity: 1,
    clipPath: 'inset(0 0 0 0)',
    transform: 'translateX(0) rotate(-3deg)',
    offset: 0.86,
    easing: EASE_IN_QUART,
  },
  {
    opacity: 0,
    clipPath: 'inset(0 0 0 0)',
    transform: 'translate(6px, -10px) rotate(-11deg)',
    offset: 1,
  },
]
/** Reduced motion: an opacity-only fade of about 120-135ms each way. */
const FADE: Keyframe[] = [
  { opacity: 0, offset: 0 },
  { opacity: 1, offset: 0.07 },
  { opacity: 1, offset: 0.92 },
  { opacity: 0, offset: 1 },
]

export function PriceGunLabel({ text, shot }: PriceGunLabelProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || shot === 0) return
    el.dataset.on = ''
    const hide = () => {
      delete el.dataset.on
    }
    if (typeof el.animate !== 'function') {
      const timer = window.setTimeout(hide, 1700)
      return () => window.clearTimeout(timer)
    }
    const reduce = prefersReducedMotion()
    const anim = el.animate(
      reduce ? FADE : GUN,
      reduce ? { duration: 1700, easing: 'linear' } : { duration: 1850 },
    )
    anim.onfinish = hide
    // A repeat copy cancels the running label before firing again.
    return () => {
      anim.onfinish = null
      anim.cancel()
      hide()
    }
  }, [shot])

  return (
    <span ref={ref} className={styles.label} aria-hidden="true">
      {text}
    </span>
  )
}
