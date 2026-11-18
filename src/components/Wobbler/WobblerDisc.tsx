import type { Ref } from 'react'
import styles from './Wobbler.module.css'

type WobblerDiscProps = { swingRef?: Ref<SVGSVGElement> }

export function WobblerDisc({ swingRef }: WobblerDiscProps) {
  return (
    <svg
      ref={swingRef}
      className={styles.swing}
      viewBox="0 0 220 372"
      focusable="false"
      aria-hidden="true"
    >
      <circle
        className={styles.ring}
        cx="110"
        cy="262"
        r="115"
        fill="none"
        stroke="#16140F"
        strokeWidth="3"
      />
      <rect
        x="99"
        y="0"
        width="22"
        height="168"
        rx="2"
        fill="rgba(236,241,244,.5)"
        stroke="rgba(70,76,80,.42)"
        strokeWidth="1"
      />
      <rect x="104" y="6" width="2.5" height="150" rx="1.25" fill="rgba(255,255,255,.85)" />
      <rect x="115.5" y="6" width="1" height="150" fill="rgba(70,76,80,.18)" />
      <circle
        cx="110"
        cy="262"
        r="108"
        fill="#F6CB2A"
        stroke="rgba(22,20,15,.22)"
        strokeWidth="1"
      />
      <circle cx="110" cy="262" r="96" fill="none" stroke="#16140F" strokeWidth="3.5" />
      <circle cx="110" cy="262" r="89" fill="none" stroke="#16140F" strokeWidth="1" />
      <text textAnchor="middle" fontSize="36">
        <tspan x="110" y="255">
          GROW THE
        </tspan>{' '}
        <tspan x="110" y="295">
          BUSINESS.
        </tspan>
      </text>
      <rect x="92" y="208" width="36" height="3" fill="#16140F" />
      <rect x="92" y="313" width="36" height="3" fill="#16140F" />
    </svg>
  )
}
