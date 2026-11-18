import { useEffect, useRef, type FocusEvent } from 'react'
import { Rail } from '../../components/Rail/Rail'
import { ShelfTalker } from '../../components/ShelfTalker/ShelfTalker'
import { Wobbler } from '../../components/Wobbler/Wobbler'
import { profile } from '../../content/profile'
import { useInViewOnce } from '../../motion/useInViewOnce'
import { useSpring } from '../../motion/useSpring'
import styles from './CareerObjective.module.css'

/** DESIGN.md Motion → Spring: wobbler w 10, zeta .22, max 12deg, cap 13deg. */
const WOBBLER_SPRING = { omega: 10, zeta: 0.22, max: 12, energyCap: 13 }
const KICK = { scroll: 6.5, nudge: 2.6, flick: 9 }
const SCROLL_KICK_DELAY_MS = 180

export function CareerObjective() {
  const wob = useSpring<SVGSVGElement>(WOBBLER_SPRING)
  const timer = useRef<number | undefined>(undefined)
  const [sectionRef, on] = useInViewOnce<HTMLElement>({
    threshold: 0.35,
    onEnter: () => {
      timer.current = window.setTimeout(() => wob.kick(KICK.scroll), SCROLL_KICK_DELAY_MS)
    },
  })
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Hover or focus in the block nudges an idle wobbler; all kicks share one spring, so they never fight.
  const nudge = () => {
    if (!wob.busy()) wob.kick(KICK.nudge)
  }
  const onFocus = (e: FocusEvent<HTMLElement>) => {
    if (!(e.target instanceof Element && e.target.closest('[data-wobbler]'))) nudge()
  }

  return (
    <section
      ref={sectionRef}
      id="objective"
      className={styles.section}
      aria-labelledby="objective-title"
      onMouseEnter={nudge}
      onFocus={onFocus}
    >
      <Rail />
      <div className={styles.row}>
        <ShelfTalker
          headingId="objective-title"
          heading="Career objective"
          text={profile.objective}
          on={on}
        />
        <Wobbler swingRef={wob.ref} onFlick={() => wob.kick(KICK.flick)} />
      </div>
    </section>
  )
}
