import { profile } from '../../content/profile'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <h1 id="hero-name" className={styles.name}>
        {profile.name}
      </h1>
    </section>
  )
}
