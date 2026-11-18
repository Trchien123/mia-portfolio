import { BrandsRow } from '../../components/BrandsRow/BrandsRow'
import { CopyEmailButton } from '../../components/CopyEmailButton/CopyEmailButton'
import { CvLink } from '../../components/CvLink/CvLink'
import { NowFlag } from '../../components/NowFlag/NowFlag'
import { Rail } from '../../components/Rail/Rail'
import { Tag } from '../../components/Tag/Tag'
import { TearOffStrip } from '../../components/TearOffStrip/TearOffStrip'
import { profile } from '../../content/profile'
import styles from './Hero.module.css'

export function Hero() {
  const { current } = profile
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <Rail />
      <div className={styles.tag}>
        <Tag as="article" labelledBy="hero-name">
          <Tag.Clip side="l" />
          <Tag.Clip side="r" />
          <div className={styles.face}>
            <div className={styles.body}>
              <h1 id="hero-name" className={`cond ${styles.name}`}>
                {profile.name}
              </h1>
              <p className={styles.line}>{profile.oneLiner.join(' ')}</p>
              <div className={styles.now} role="group" aria-label="Current role">
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
