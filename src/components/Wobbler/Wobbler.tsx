import type { Ref } from 'react'
import { useReducedMotion } from '../../motion/useReducedMotion'
import { Clip } from '../Clip/Clip'
import { WobblerDisc } from './WobblerDisc'
import styles from './Wobbler.module.css'

type WobblerProps = { onFlick?: () => void; swingRef?: Ref<SVGSVGElement> }

/** A toy: flick it to swing. Under reduced motion it is static and out of the tab order. */
export function Wobbler({ onFlick, swingRef }: WobblerProps) {
  const still = useReducedMotion()
  return (
    <button
      type="button"
      className={still ? `${styles.wob} ${styles.still}` : styles.wob}
      aria-label="Flick the shelf wobbler"
      tabIndex={still ? -1 : undefined}
      aria-hidden={still || undefined}
      data-wobbler
      onClick={onFlick}
    >
      <span className={styles.clipWrap}>
        <Clip side="center" />
      </span>
      <WobblerDisc swingRef={swingRef} />
    </button>
  )
}
