import { useState, type CSSProperties } from 'react'
import { BrandsRow } from '../../components/BrandsRow/BrandsRow'
import { CopyEmailButton } from '../../components/CopyEmailButton/CopyEmailButton'
import { CvLink } from '../../components/CvLink/CvLink'
import { NowFlag } from '../../components/NowFlag/NowFlag'
import { Rail } from '../../components/Rail/Rail'
import { Tag } from '../../components/Tag/Tag'
import { TearOffStrip } from '../../components/TearOffStrip/TearOffStrip'
import { profile } from '../../content/profile'
import { dataOn, t0 } from '../../motion/motion'
import { useBrushSway } from '../../motion/useBrushSway'
import { useInViewOnce } from '../../motion/useInViewOnce'
import styles from './Hero.module.css'

/** NOW flag flip target, ms from load. */
const NOW_AT_MS = 1250

export function Hero() {
  const { current } = profile
  const { tagRef, faceRef } = useBrushSway<HTMLDivElement, HTMLDivElement>()
  const [flipDelay, setFlipDelay] = useState(0)
  // The NOW flag waits for the tag to settle (~1.25s after load), or flips at once if reached later.
  const [nowRef, nowOn] = useInViewOnce<HTMLDivElement>({
    threshold: 0.4,
    onEnter: () => setFlipDelay(Math.max(0, NOW_AT_MS - (performance.now() - t0))),
  })
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name" data-draw="load">
      <Rail />
      <div ref={tagRef} className={styles.tag}>
        <Tag as="article" labelledBy="hero-name">
          <Tag.Clip side="l" />
          <Tag.Clip side="r" />
          <div ref={faceRef} className={styles.face}>
            <div className={styles.body}>
              <h1 id="hero-name" className={`cond ${styles.name}`}>
                {profile.name}
              </h1>
              <p className={styles.line}>{profile.oneLiner.join(' ')}</p>
              <div
                ref={nowRef}
                className={styles.now}
                role="group"
                aria-label="Current role"
                data-now
                data-on={dataOn(nowOn)}
                style={{ '--d': `${Math.round(flipDelay)}ms` } as CSSProperties}
              >
                <p>
                  <NowFlag />
                </p>
                <p className={`cond ${styles.role}`}>{current.role}</p>
                <p className={styles.company}>{current.company}</p>
                <p className={styles.note}>{current.promotedLine}</p>
              </div>
              <BrandsRow brands={profile.brands} />
            </div>
            <TearOffStrip>
              <span className={styles.mailRow}>
                <a className={styles.mail} href={`mailto:${profile.email}`}>
                  <span className={styles.mailPrefix}>Email</span>
                  {profile.email}
                </a>
                <CopyEmailButton email={profile.email} />
              </span>
              <CvLink href={profile.cvUrl} />
            </TearOffStrip>
          </div>
        </Tag>
      </div>
    </section>
  )
}
