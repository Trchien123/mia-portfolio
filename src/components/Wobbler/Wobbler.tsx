import type { Ref } from 'react'
import { Clip } from '../Clip/Clip'
import { WobblerDisc } from './WobblerDisc'
import styles from './Wobbler.module.css'

type WobblerProps = { onFlick?: () => void; swingRef?: Ref<SVGSVGElement> }

export function Wobbler({ onFlick, swingRef }: WobblerProps) {
  return (
    <button type="button" className={styles.wob} aria-label="Flick the shelf wobbler" onClick={onFlick}>
      <span className={styles.clipWrap}>
        <Clip side="center" />
      </span>
      <WobblerDisc swingRef={swingRef} />
    </button>
  )
}
