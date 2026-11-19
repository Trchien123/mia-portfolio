import type { CSSProperties } from 'react'
import { BrandsRow } from '../../components/BrandsRow/BrandsRow'
import { CopyEmailButton } from '../../components/CopyEmailButton/CopyEmailButton'
import { CvLink } from '../../components/CvLink/CvLink'
import { NowFlag } from '../../components/NowFlag/NowFlag'
import { Rail } from '../../components/Rail/Rail'
import { Tag } from '../../components/Tag/Tag'
import { TearOffStrip } from '../../components/TearOffStrip/TearOffStrip'
import { profile } from '../../content/profile'
import { useBrushSway } from '../../motion/useBrushSway'
import styles from './Hero.module.css'

/** Reading order of the hero rows: each prints one stagger step after the one above it. */
const row = (k: number) => ({ '--k': k }) as CSSProperties

export function Hero() {
  const { current } = profile
  const { tagRef, faceRef } = useBrushSway<HTMLDivElement, HTMLDivElement>()
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name" data-draw="load">
      <Rail />
      <div ref={tagRef} className={styles.tag}>
        <Tag as="article" labelledBy="hero-name">
          <Tag.Clip side="l" />
          <Tag.Clip side="r" />
          <div ref={faceRef} className={styles.face}>
            <div className={styles.body}>
              <h1 id="hero-name" className={`cond ${styles.name} ${styles.cascade}`} style={row(0)}>
                {profile.name}
              </h1>
              <p className={`${styles.line} ${styles.cascade}`} style={row(1)}>
                {profile.oneLiner.join(' ')}
              </p>
              <div
                className={styles.now}
                role="group"
                aria-label="Current role"
                data-now
                data-on=""
                style={{ ...row(2), '--d': 'var(--hero-row-2-at)' } as CSSProperties}
              >
                <p>
                  <NowFlag />
                </p>
                <p className={`cond ${styles.role} ${styles.cascade}`}>{current.role}</p>
                <p className={`${styles.company} ${styles.cascade}`}>{current.company}</p>
                <p className={`${styles.note} ${styles.cascade}`}>{current.promotedLine}</p>
              </div>
              <div className={`${styles.brands} ${styles.cascade}`} style={row(3)}>
                <BrandsRow brands={profile.brands} />
              </div>
            </div>
            <TearOffStrip>
              <span className={`${styles.mailRow} ${styles.cascade}`} style={row(4)}>
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
